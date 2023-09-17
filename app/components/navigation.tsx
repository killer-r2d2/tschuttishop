import {UserCircleIcon, ShoppingCartIcon, Bars4Icon} from "@heroicons/react/24/solid";

export default function Navigation() {
    return (
        <>
            <nav className="bg-white">
                <div className="container p-5 flex justify-between items-center shadow-xl rounded-b-xl mb-5">
                    <button className="block md:hidden">
                        <Bars4Icon className="w-10 text-slate-500 hover:text-slate-900 transition-colors" />
                    </button>
                    <div>
                        <p className="text-2xl">Tschuttishop</p>
                    </div>
                    <div className="flex gap-16 items-center">
                        <ul className="flex gap-5 text-slate-500">
                            <li className="hover:text-slate-900 transition-colors">Home</li>
                            <li className="hover:text-slate-900 transition-colors">Shirts</li>
                            <li className="hover:text-slate-900 transition-colors">Schuhe</li>
                        </ul>
                        <div className="flex gap-4">
                            <UserCircleIcon className="w-8 text-slate-500 hover:text-slate-900 transition-colors"/>
                            <ShoppingCartIcon className="w-8 text-slate-500 hover:text-slate-900 transition-colors"/>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
};


