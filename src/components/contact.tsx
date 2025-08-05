export default function ContactSection() {
    return (
        <section id="contato" className="bg-white py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Fique por dentro do lançamento!</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Deixe seu e-mail e seja o primeiro a saber sobre nossos novos e-books, audiobooks e promoções exclusivas.</p>
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                    <input type="email" placeholder="Seu melhor e-mail" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <button type="submit" className="cta-button text-white font-bold py-3 px-6 rounded-md hover:shadow-lg transition">
                        Me avise!
                    </button>
                </form>
            </div>
        </section>
    );
}

