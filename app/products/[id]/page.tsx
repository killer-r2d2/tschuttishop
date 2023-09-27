export default function Page({params}: { params: { id: string } }) {
    const product: string = params.id;
    return (
        <div className="container">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3 bg-slate-200 h-[25vh] p-5">
                    <p className="font-bold">Kategorien</p>
                </div>
                <div className="col-span-4 bg-slate-200 h-[500px] p-5 rounded-xl">
                    <p>Produkt Bild</p>
                </div>

                <div className="col-span-5 h-full">
                    <h1 className="text-2xl font-bold">Product ID: {product}</h1>
                </div>
            </div>
        </div>
    );
}