import { PROD_REG_EXP, UAT_REG_EXP } from "../utils.js";
import { google } from "googleapis";
import path from "path";
class GoogleAPIClient {
    auth;
    constructor() {
        this.auth = new google.auth.GoogleAuth({
            keyFile: path.resolve(import.meta.dirname, "../../google.json"),
            scopes: ["https://www.googleapis.com/auth/documents.readonly"],
        });
    }
    async read(documentId, environment) {
        try {
            const docs = google.docs({ version: "v1", auth: this.auth });
            const content = await docs.documents.get({ documentId });
            const delimiter = environment === "prod" ? PROD_REG_EXP : UAT_REG_EXP;
            return this.extractTextByBlock(content.data.body?.content, delimiter);
        }
        catch (error) {
            console.error("Error reading document:", error);
            return undefined;
        }
    }
    extractTextByBlock(content, regexDelimiter) {
        const blocks = [];
        if (!content) {
            return [];
        }
        let currentBlock = "";
        content.forEach((element) => {
            if (element.paragraph && element.paragraph.elements) {
                element.paragraph.elements.forEach((paragraphElement) => {
                    if (paragraphElement.textRun && paragraphElement.textRun.content) {
                        const text = paragraphElement.textRun.content.trim();
                        if (regexDelimiter.test(text)) {
                            if (currentBlock.trim()) {
                                blocks.push(currentBlock.trim());
                                currentBlock = "";
                            }
                        }
                        currentBlock += text + "\n";
                    }
                });
            }
        });
        if (currentBlock.trim()) {
            blocks.push(currentBlock.trim());
        }
        return blocks;
    }
}
const GoogleDocumentClient = new GoogleAPIClient();
export { GoogleDocumentClient };
