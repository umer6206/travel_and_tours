import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: "Gilgit-Baltistan Tourism",
  description: "Discover the beauty of Gilgit-Baltistan - Home to K2, Hunza Valley, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
          <Navigation />
          {children}
          <Footer />
    </div>
  );
}
