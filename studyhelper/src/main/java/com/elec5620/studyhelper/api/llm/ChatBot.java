package com.elec5620.studyhelper.api.llm;

import io.github.cdimascio.dotenv.Dotenv;

import java.net.URL;
import java.util.Scanner;

import com.elec5620.studyhelper.core.HelperSystem;

import dev.langchain4j.chain.ConversationalRetrievalChain;
import dev.langchain4j.data.document.Document;

import dev.langchain4j.data.document.splitter.DocumentSplitters;

import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.embedding.AllMiniLmL6V2EmbeddingModel;
import dev.langchain4j.model.embedding.EmbeddingModel;

import dev.langchain4j.model.openai.OpenAiChatModel;

import dev.langchain4j.retriever.EmbeddingStoreRetriever;

import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;

import static dev.langchain4j.data.document.FileSystemDocumentLoader.loadDocument;



public class ChatBot {

    public static String response(String filePath, String request) {
        Dotenv dotenv = Dotenv.load();
        String token = dotenv.get("OPENAI_API_KEY");

        System.out.println("file path: " + filePath);

        try {
            EmbeddingModel embeddingModel = new AllMiniLmL6V2EmbeddingModel();

            OpenAiChatModel model = OpenAiChatModel.builder().apiKey(token).timeout(Duration.ofMinutes(1)).build();


                    EmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();

                    EmbeddingStoreIngestor ingestor = EmbeddingStoreIngestor.builder()
                            .documentSplitter(DocumentSplitters.recursive(500, 0))
                            .embeddingModel(embeddingModel)
                            .embeddingStore(embeddingStore)
                            .build();

                            Document document = loadDocument(toPath(filePath));
                    ingestor.ingest(document);

                    ConversationalRetrievalChain chain = ConversationalRetrievalChain.builder()
                            .chatLanguageModel(model)
                            .retriever(EmbeddingStoreRetriever.from(embeddingStore, embeddingModel))
                            // .chatMemory() // you can override default chat memory
                            // .promptTemplate() // you can override default prompt template
                            .build();

                    String answer = chain.execute(request);
                    System.out.println(answer); // answer based on given information
                    answer = answer.replace("\\n", System.lineSeparator());
                    return answer;
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public static void main(String[] args) {

    Dotenv dotenv = Dotenv.load();
    String token = dotenv.get("OPENAI_API_KEY");

    try (Scanner myObj = new Scanner(System.in)) {
        System.out.println("Enter question to ask:");

        String question = myObj.nextLine();



        EmbeddingModel embeddingModel = new AllMiniLmL6V2EmbeddingModel();

                EmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();

                EmbeddingStoreIngestor ingestor = EmbeddingStoreIngestor.builder()
                        .documentSplitter(DocumentSplitters.recursive(500, 0))
                        .embeddingModel(embeddingModel)
                        .embeddingStore(embeddingStore)
                        .build();

                        Document document = loadDocument(toPath("example.txt"));
                ingestor.ingest(document);

                ConversationalRetrievalChain chain = ConversationalRetrievalChain.builder()
                        .chatLanguageModel(OpenAiChatModel.withApiKey(token))
                        .retriever(EmbeddingStoreRetriever.from(embeddingStore, embeddingModel))
                        // .chatMemory() // you can override default chat memory
                        // .promptTemplate() // you can override default prompt template
                        .build();

                String answer = chain.execute(question);
                System.out.println(answer); // answer based on given information
    }

    }

    private static Path toPath(String fileName) {
        try {
            Path filePath = Paths.get(fileName);
            URL fileURL = filePath.toUri().toURL();

            return Paths.get(fileURL.toURI());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
    


    
}
