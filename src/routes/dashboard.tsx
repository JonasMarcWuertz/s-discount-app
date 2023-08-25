import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, Collection } from './types'; // Importieren Sie die benötigten Typen aus types.ts

const Dashboard = () => {
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [discountValue, setDiscountValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [excludedProducts, setExcludedProducts] = useState<string[]>([]);
  const [productId, setProductId] = useState<string>('');
  const [productTitle, setProductTitle] = useState<string>('');
  const [variantId, setVariantId] = useState<string>('');
  const [variantTitle, setVariantTitle] = useState<string>('');
  const [variantPrice, setVariantPrice] = useState<number>(0); 
  const [collectionId, setCollectionId] = useState<string>('');
  const [collectionName, setCollectionName] = useState<string>(''); // Name der Kollektion
  const [collectionTitle, setCollectionTitle] = useState<string>(''); // Titel der Kollektion
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get_discount_data');
        const data = await response.json();
        // Hier können Sie den geladenen Datenzustand entsprechend setzen
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const discountData = {
      title,
      description,
      selectedTrigger,
      selectedProducts,
      excludedProducts,
      // ... (andere Daten, die Sie senden möchten)
    };

    try {
      const response = await fetch('/api/save_discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discountData)
      });

      if (response.ok) {
        console.log('Rabatt erfolgreich gespeichert!');
      } else {
        console.error('Fehler beim Speichern des Rabatts:', await response.text());
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="triggerSelect">Trigger auswählen:</label>
        <select id="triggerSelect" value={selectedTrigger || undefined} onChange={(e) => setSelectedTrigger(e.target.value)}>
          <option value="product">Produkt</option>
          <option value="variant">Produktvariante</option>
          <option value="collection">Kollektion</option>
          <option value="cartAmount">Warenkorb Betrag</option>
        </select>
      </div>

      {/* Rabatt-Auswahl */}
      <div>
        <label htmlFor="discountSelect">Rabattart auswählen:</label>
        <select id="discountSelect" value={selectedDiscount || undefined} onChange={(e) => setSelectedDiscount(e.target.value)}>
          <option value="percentFlat">Prozentualer Rabatt</option>
          <option value="perUnitFlat">Rabatt pro Einheit</option>
          <option value="perUnitPercent">Prozentualer Rabatt pro Einheit</option>
          <option value="flat">Fester Rabattbetrag</option>
        </select>
      </div>

      {/* Konkrete Trigger-Eingabe */}
      <div>
        {selectedTrigger === 'product' && (
          <div>
            <label htmlFor="productSelect">Produkte auswählen:</label>
            <select 
              id="productSelect" 
              multiple 
              value={selectedProducts} 
              onChange={(e) => setSelectedProducts(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedTrigger === 'variant' && (
          <div>
            <label htmlFor="variantSelect">Produktvarianten auswählen:</label>
            <select 
              id="variantSelect" 
              multiple 
              value={selectedProducts} 
              onChange={(e) => setSelectedProducts(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {productVariants.map(variant => (
                <option key={variant.id} value={variant.id}>{variant.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedTrigger === 'collection' && (
          <div>
            <label htmlFor="collectionSelect">Kollektionen auswählen:</label>
            <select 
              id="collectionSelect" 
              multiple 
              value={selectedProducts} 
              onChange={(e) => setSelectedProducts(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {collections.map(collection => (
                <option key={collection.id} value={collection.id}>{collection.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedTrigger === 'cartAmount' && (
          <div>
            <label htmlFor="cartAmountInput">Warenkorb Betrag:</label>
            <input 
              id="cartAmountInput" 
              type="number" 
              value={discountValue} 
              onChange={(e) => setDiscountValue(e.target.value)} 
            />
          </div>
        )}
      </div>

      {/* Rabattwert-Eingabe */}
      <div>
        <label htmlFor="discountValueInput">Rabattwert:</label>
        <input 
          id="discountValueInput" 
          type="text" 
          value={discountValue} 
          onChange={(e) => setDiscountValue(e.target.value)} 
        />
      </div>

      {/* Titel und Beschreibung */}
      <div>
        <label htmlFor="titleInput">Titel:</label>
        <input 
          id="titleInput" 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="descriptionTextarea">Beschreibung:</label>
        <textarea 
          id="descriptionTextarea" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Produkte, die vom Rabatt ausgeschlossen sind */}
      <div>
        <label htmlFor="excludedProductsSelect">Produkte ausschließen:</label>
        <select 
          id="excludedProductsSelect" 
          multiple 
          value={excludedProducts} 
          onChange={(e) => setExcludedProducts(Array.from(e.target.selectedOptions, option => option.value))}
        >
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      {/* Eingabefelder für Produkte */}
      <div>
        <h2>Produkte hinzufügen</h2>
        <input 
          type="text" 
          placeholder="Produkt-ID" 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Produkt-Titel" 
          value={productTitle} 
          onChange={(e) => setProductTitle(e.target.value)}
        />
        <button onClick={() => {
          if (productId && productTitle) {
            setProducts(prevProducts => [...prevProducts, { id: productId, name: productTitle }]);
            setProductId('');
            setProductTitle('');
          }
        }}>Produkt hinzufügen</button>
      </div>

      {/* Eingabefelder für Produktvarianten */}
      <div>
        <h2>Produktvarianten hinzufügen</h2>
        <input 
          type="text" 
          placeholder="Variante-ID" 
          value={variantId} 
          onChange={(e) => setVariantId(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Variante-Titel" 
          value={variantTitle} 
          onChange={(e) => setVariantTitle(e.target.value)}
        />

<input 
          type="number" 
          placeholder="Variante-Preis" 
          value={variantPrice} 
          onChange={(e) => setVariantPrice(Number(e.target.value))}
        />
        <button onClick={() => {
          if (variantId && variantTitle && variantPrice) {
            setProductVariants(prevVariants => [...prevVariants, { id: variantId, name: variantTitle, price: variantPrice }]);
            setVariantId('');
            setVariantTitle('');
            setVariantPrice(0);
          }
        }}>Produktvariante hinzufügen</button>
      </div>

      {/* Eingabefelder für Kollektionen */}
      <div>
        <h2>Kollektionen hinzufügen</h2>
        <input 
          type="text" 
          placeholder="Kollektion-ID" 
          value={collectionId} 
          onChange={(e) => setCollectionId(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Kollektion-Name" 
          value={collectionTitle} 
          onChange={(e) => setCollectionTitle(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Kollektion-Titel" 
          value={collectionTitle} 
          onChange={(e) => setCollectionTitle(e.target.value)}
        />
        {/* Hier könnten Sie auch eine Möglichkeit hinzufügen, Produkte zur Kollektion hinzuzufügen, wenn gewünscht */}
        <button onClick={() => {
          if (collectionId && collectionTitle && collectionTitle) {
            setCollections(prevCollections => [...prevCollections, { id: collectionId, name: collectionTitle, title: collectionTitle, products: [] }]);
            setCollectionId('');
            setCollectionTitle('');
            setCollectionTitle('');
          }
        }}>Kollektion hinzufügen</button>
      </div>

      {/* Absenden */}
      <button type="submit">Rabatt speichern</button>
    </form>
  );
}
