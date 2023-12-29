import { NextApiRequest, NextApiResponse } from "next";
import { getProductById, updateProduct } from "@/services/productService";

// Weitere benötigte Importe...

export default async function purchaseProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { productId, buyerId } = req.body;

    // Eingabevalidierung...
    if (!productId || !buyerId) {
      return res.status(400).json({ error: "Product ID and Buyer ID are required." });
    }

    try {
      // Produkt abrufen und überprüfen, ob es verfügbar ist
      const product = await getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }
      if (product.buyerId) {
        return res.status(400).json({ error: "Product has already been purchased." });
      }

      // Kauf durchführen und nur die notwendigen Felder aktualisieren
      const updatedProduct = await updateProduct(productId, {
        buyerId: buyerId,
        isPaid: true,
        inStock: false // entsprechend anpassen, falls benötigt
      });

      // Erfolgsantwort senden
      return res.status(200).json(updatedProduct);
    } catch (error) {
         // Typüberprüfung
    if (error instanceof Error) {
      // Jetzt können Sie sicher auf error.message zugreifen
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    } else {
      // Falls error kein Error-Objekt ist
      console.error('An unexpected error occurred');
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    }
  } else {
    // Nicht unterstützte Methoden abfangen
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
