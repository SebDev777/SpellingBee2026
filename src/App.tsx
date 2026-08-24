import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '@/pages/Main/Main';
import Settings from '@/pages/Settings/Config';
import Header from '@/components/Header/Header';
import { Toaster } from 'react-hot-toast';

import 'slot-text/style.css';

export default function App() {
    return (
        <BrowserRouter>
            <Toaster />
            <div className="min-h-dvh flex flex-col">
                <Header />

                <main className="flex-1 flex">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}