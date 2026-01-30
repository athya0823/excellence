import Container from "../components/ui/Container";
export default function NotFound() {
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-3 text-neutral-600">The page you requested doesn’t exist.</p>
    </Container>
  );
}
