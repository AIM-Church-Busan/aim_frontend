import HomePage from "@/features/home/HomePage"

export const metadata = {
    title: "English-Speaking International Church in Busan",
    description: "AIM is an English-speaking international church in Busan, South Korea. Whether you're a student, expat, military family, or traveler, you'll find a warm community here.",
    openGraph: {
        title: "Antioch International Ministry — English-Speaking Church in Busan",
        description: "An English-speaking international church in Busan, South Korea.",
        url: "https://실제도메인.com",
        siteName: "AIM Church",
        images: [
            {
                url: "/openGraph.png",
                width: 1200,
                height: 630,
                alt: "Antioch International Ministry",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Antioch International Ministry — English-Speaking Church in Busan",
        description: "An English-speaking international church in Busan, South Korea.",
        images: ["/openGraph.png"],
    },
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <HomePage />
      </main>
    </div>
  );
}
