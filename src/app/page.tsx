import Header from "@/components/header"
import Hero from "@/components/hero"
import Ebooks from "@/components/e-books"
import Footer from "@/components/footer"
import Audiobooks from "@/components/audiobooks"


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Ebooks />
      <Audiobooks/>
      <Footer />
    </div>
  )
}
