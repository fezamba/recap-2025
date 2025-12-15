import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formSchema } from "@/form/schema";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  title: {
    fontSize: 22,
    marginBottom: 6,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  question: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  answer: {
    marginBottom: 8,
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    color: "#777",
  },
});

type Props = {
  email: string;
  answers: Record<string, string | undefined>;
};

export function RetrospectivaPdf({ email, answers }: Props) {
  const date = new Date().toLocaleDateString("pt-BR");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Retrospectiva 2025 / Visão 2026</Text>

        {formSchema.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            {section.questions.map((q) => (
              <View key={q.id}>
                <Text style={styles.question}>{q.label}</Text>
                <Text style={styles.answer}>
                  {answers[q.id]?.trim() || "—"}
                </Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          Documento gerado em {date}.
        </Text>
      </Page>
    </Document>
  );
}
