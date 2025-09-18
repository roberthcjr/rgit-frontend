export default function ContentSection() {
  return (
    <section
      className="py-16 md:py-32 bg-gradient-to-b from-zinc-100 to-zinc-300"
      id="about"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-medium">
            A RGIT nasceu de uma dor que almeja curar em todos.
          </h2>
          <div className="space-y-6">
            <p>
              {" "}
              A <strong>RGIT</strong> nasceu a partir de uma dor real: uma
              empresa que dependia de métodos manuais para controlar o
              empréstimo de suas ferramentas. Esse processo gerava falhas,
              retrabalho e falta de visibilidade.{" "}
            </p>{" "}
            <p>
              {" "}
              Foi para resolver esse desafio que criamos a <strong>RGIT</strong>
              . Hoje, nossa plataforma vai muito além da gestão de ferramentas —
              ela oferece um ecossistema completo, capaz de se adaptar a
              qualquer negócio que trabalhe com empréstimos. Mais controle,
              organização e eficiência para empresas que querem simplificar sua
              operação.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
