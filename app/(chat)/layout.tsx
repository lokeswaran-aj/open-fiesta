import { Header } from "@/components/header";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <Header />
      {children}
    </div>
  );
}
