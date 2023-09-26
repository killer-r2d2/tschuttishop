import { Product } from "@/app/types/Product";
import Image from "next/image";

const dummyData: Product[] = [
    {
        id: 1,
        name: 'Card 1',
        description: 'This is the content of Card 1.',
        price: 200,
        inStock: true,
        createdAt: 123,
        updatedAt: 123,
    },
    {
        id: 2,
        name: 'Card 2',
        description: 'This is the content of Card 1.',
        price: 200,
        inStock: true,
        createdAt: 123,
        updatedAt: 123,
    },
    {
        id: 3,
        name: 'Card 3',
        description: 'This is the content of Card 1.',
        price: 200,
        inStock: true,
        createdAt: 123,
        updatedAt: 123,
    },
    {
        id: 4,
        name: 'Card 4',
        description: 'This is the content of Card 1.',
        price: 200,
        inStock: true,
        createdAt: 123,
        updatedAt: 123,
    },
    {
        id: 5,
        name: 'Card 5',
        description: 'This is the content of Card 1.',
        price: 200,
        inStock: true,
        createdAt: 123,
        updatedAt: 123,
    },
    {
        id: 6,
        name: 'Card 6',
        description: 'This is the content of Card 1. dawda awdaw ddawd dwdaw dawdawdawdw dwaw dawdwad',
        price: 200,
        inStock: true,
        createdAt: 123,
        updatedAt: 123,
    },
];

// Create a Card component
const Card: React.FC<Product> = ({ id, name, description, price }) => {
    return (
        <div className="card border shadow-xl rounded-xl hover:scale-101 hover:shadow-2xl transition" id="{id}">
            <div>
                <Image
                       height="1000"
                       width="1000"
                       src="/shirt-player.png"
                       alt="Shirt"
                       className="rounded-t-xl"
                />
            </div>
            <div className="p-5">
                <h2 className="font-bold">{name}</h2>
                <p className="mb-5">{description}</p>
                <hr/>
                <p className="font-bold mt-5">{price}</p>
            </div>
        </div>
    );
};

interface CardsListProps {
    maxCards: number;
}

// Create a CardsList component to render the list of cards
const CardsList: React.FC<CardsListProps> = ({ maxCards }) => {
    const limitedData = dummyData.slice(0, maxCards);

    return (
        <div className="cards-list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {limitedData.map((card, id) => (
                    <Card key={id} name={card.name} description={card.description} price={card.price} id={card.id} />
                ))}
            </div>
        </div>
    );
};

export default CardsList;