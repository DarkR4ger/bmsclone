
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container mt-5 shadow-2xl pt-5 min-h-screen">{children}</main>;
}
