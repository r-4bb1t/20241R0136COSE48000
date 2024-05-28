import Edit from "../components/edit";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Edit
        defaultValue={{
          title: "",
          content: "",
          questions: [],
          department: "",
          category: "",
          pdf: [],
        }}
      />
    </main>
  );
}
