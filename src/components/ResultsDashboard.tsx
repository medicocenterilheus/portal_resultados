import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export default function ResultsDashboard({ onLogout }: { onLogout: () => void }) {
  const exam = {
    id: "2026.07.31-9988",
    name: "Sorologia para Herpes Simplex Vírus (HSV) TIPO 1 E 2",
    dateEmissao: "31/07/2026 11:38",
    paciente: "Johnatan David Farias Oliveira",
    nascimento: "03/06/1996 (30 anos)",
    sexo: "Masculino",
    cpf: "06406311507",
    medico: "Dr. Gustavo Cunha Carvalho da Silva (CRM-BA 11182 / RQE 12122)",
    material: "Soro (Volume: 2,0 mL)",
    condicaoAmostra: "Adequada (Sem hemólise/lipemia)",
    dataColeta: "30/07/2026 08:15",
    dataEntrada: "30/07/2026 09:30",
    metodo: "Imunoensaio Quimioluminescente de Micropartículas (CMIA)",
    itens: [
        { parametro: "Anticorpos IgG (Anti-HSV 1 e 2)", resultado: "0,15 Índice (S/CO)", status: "NÃO REAGENTE", ref: "Inferior a 0,90" },
        { parametro: "Anticorpos IgM (Anti-HSV 1 e 2)", resultado: "0,42 Índice (S/CO)", status: "NÃO REAGENTE", ref: "Inferior a 0,90" }
    ]
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = 210;
    const width = pageWidth - 2 * margin; // 190

    const darkBlue = [24, 62, 100];
    const gray = [100, 100, 100];
    const black = [0, 0, 0];
    
    // helper for bold label + normal value
    const printLabelValue = (label: string, value: string, x: number, y: number) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, x, y);
        const w = doc.getTextWidth(label);
        doc.setFont("helvetica", "normal");
        doc.text(value, x + w, y);
    }

    // Header
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.rect(margin, 15, width, 22);
    doc.line(135, 15, 135, 37);

    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("MÉDICO CENTER", margin + 3, 22);
    
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Centro de Medicina Diagnóstica Avançada | CNPJ: 40.740.466/0001-48", margin + 3, 27);
    doc.text("Praça Antonio Muniz, 73, Centro, Ilhéus, BA - CEP 45653-210", margin + 3, 31);
    
    doc.setTextColor(black[0], black[1], black[2]);
    doc.setFontSize(9);
    printLabelValue("Protocolo (OS): ", exam.id, 138, 21);
    printLabelValue("Emissão: ", exam.dateEmissao, 138, 26);
    printLabelValue("Página: ", "1 de 2", 138, 31);
    
    // 1. Identificação
    let y = 47;
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("1. IDENTIFICAÇÃO DO PACIENTE", margin, y);
    
    y += 3;
    doc.setTextColor(black[0], black[1], black[2]);
    doc.rect(margin, y, width, 18);
    doc.line(margin, y + 9, margin + width, y + 9);
    doc.line(90, y, 90, y + 9);
    doc.line(150, y, 150, y + 9);
    doc.line(65, y + 9, 65, y + 18);
    
    doc.setFontSize(9);
    printLabelValue("Nome: ", exam.paciente, margin + 3, y + 6);
    printLabelValue("Nascimento: ", exam.nascimento, 93, y + 6);
    printLabelValue("Sexo: ", exam.sexo, 153, y + 6);
    
    printLabelValue("Documento (CPF): ", exam.cpf, margin + 3, y + 15);
    printLabelValue("Médico Solicitante: ", exam.medico, 68, y + 15);
    
    // 2. Dados Amostra
    y += 28;
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("2. DADOS DA AMOSTRA E METODOLOGIA", margin, y);
    
    y += 3;
    doc.setTextColor(black[0], black[1], black[2]);
    doc.rect(margin, y, width, 27);
    doc.line(margin, y + 9, margin + width, y + 9);
    doc.line(margin, y + 18, margin + width, y + 18);
    doc.line(105, y, 105, y + 18);
    
    doc.setFontSize(9);
    printLabelValue("Material: ", exam.material, margin + 3, y + 6);
    printLabelValue("Condição da Amostra: ", exam.condicaoAmostra, 108, y + 6);
    
    printLabelValue("Data/Hora Coleta: ", exam.dataColeta, margin + 3, y + 15);
    printLabelValue("Data/Hora Entrada Lab: ", exam.dataEntrada, 108, y + 15);
    
    printLabelValue("Método Analítico: ", exam.metodo, margin + 3, y + 24);
    
    // Tabela Resultados
    y += 40;
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SOROLOGIA PARA HERPES SIMPLEX VÍRUS (HSV) TIPO 1 E 2", pageWidth/2, y, { align: "center" });
    
    y += 8;
    doc.setTextColor(black[0], black[1], black[2]);
    doc.rect(margin, y, width, 10);
    doc.line(80, y, 80, y + 10);
    doc.line(135, y, 135, y + 10);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Parâmetro Analisado", margin + 3, y + 6);
    doc.text("Resultado", 83, y + 6);
    doc.text("Valores de Referência", 138, y + 6);
    
    y += 10;
    
    const rowHeight = 25;
    // item 1
    let itemY = y;
    doc.rect(margin, itemY, width, rowHeight);
    doc.line(80, itemY, 80, itemY + rowHeight);
    doc.line(135, itemY, 135, itemY + rowHeight);
    
    doc.setFont("helvetica", "bold");
    doc.text("Anticorpos IgG (Anti-HSV 1 e 2)", margin + 3, itemY + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFontSize(8);
    doc.text("Marcador de infecção passada /", margin + 3, itemY + 14);
    doc.text("Memória imunológica", margin + 3, itemY + 18);
    
    doc.setTextColor(black[0], black[1], black[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("0,15 Índice (S/CO)", 83, itemY + 8);
    doc.setTextColor(34, 197, 94); // Green
    doc.text("NÃO REAGENTE", 83, itemY + 18);
    
    doc.setTextColor(black[0], black[1], black[2]);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Não Reagente: Inferior a 0,90", 138, itemY + 8);
    doc.text("Indeterminado: 0,90 a 1,10", 138, itemY + 13);
    doc.text("Reagente: Superior a 1,10", 138, itemY + 18);
    
    y += rowHeight;
    
    // item 2
    itemY = y;
    doc.rect(margin, itemY, width, rowHeight);
    doc.line(80, itemY, 80, itemY + rowHeight);
    doc.line(135, itemY, 135, itemY + rowHeight);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Anticorpos IgM (Anti-HSV 1 e 2)", margin + 3, itemY + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.setFontSize(8);
    doc.text("Marcador de infecção ativa / Fase", margin + 3, itemY + 14);
    doc.text("aguda", margin + 3, itemY + 18);
    
    doc.setTextColor(black[0], black[1], black[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("0,42 Índice (S/CO)", 83, itemY + 8);
    doc.setTextColor(34, 197, 94); // Green
    doc.text("NÃO REAGENTE", 83, itemY + 18);
    
    doc.setTextColor(black[0], black[1], black[2]);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Não Reagente: Inferior a 0,90", 138, itemY + 8);
    doc.text("Indeterminado: 0,90 a 1,10", 138, itemY + 13);
    doc.text("Reagente: Superior a 1,10", 138, itemY + 18);
    
    // PAGE 2
    doc.addPage();
    y = 20;
    
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("3. INTERPRETAÇÃO CLÍNICA E LIMITAÇÕES DO MÉTODO", margin, y);
    
    y += 10;
    doc.setTextColor(black[0], black[1], black[2]);
    doc.setFontSize(9);
    
    const writeBullet = (title: string, textLines: string[], startY: number) => {
        doc.setFillColor(black[0], black[1], black[2]);
        doc.circle(margin + 6, startY - 1, 1, "F");
        doc.setFont("helvetica", "bold");
        doc.text(title, margin + 9, startY);
        let currentX = margin + 9 + doc.getTextWidth(title) + 2;
        doc.setFont("helvetica", "normal");
        doc.text(textLines[0], currentX, startY);
        
        let localY = startY + 6;
        for (let i = 1; i < textLines.length; i++) {
            doc.text(textLines[i], margin + 9, localY);
            localY += 6;
        }
        return localY + 2;
    };
    
    y = writeBullet("Interpretação:", ["A ausência de anticorpos IgG e IgM sugere que o paciente não teve contato prévio com o vírus Herpes", "Simplex (tipos 1 e 2) ou encontra-se na janela imunológica (fase muito inicial da infecção onde os anticorpos ainda não são", "detectáveis)."], y);
    
    y = writeBullet("Janela Imunológica:", ["Em casos de suspeita clínica forte com resultados não reagentes, recomenda-se a repetição do", "exame em 14 a 21 dias a critério médico."], y);
    
    y = writeBullet("Limitações:", ["Ensaios sorológicos podem apresentar reações cruzadas com outros vírus da família Herpesviridae (como", "Varicela-Zoster, Epstein-Barr ou Citomegalovírus). Este exame não distingue o tipo 1 do tipo 2."], y);
    
    y = writeBullet("Nota Técnica:", ["O diagnóstico definitivo não deve basear-se em um único teste laboratorial, devendo o médico correlacionar", "os achados com o quadro clínico e epidemiológico do paciente."], y);
    
    // Footer table
    y += 10;
    doc.rect(margin, y, width, 30);
    doc.line(75, y, 75, y + 30);
    doc.line(135, y, 135, y + 30);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Controle de Qualidade:", margin + 3, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("Certificação PALC (SBPC/ML) - No.", margin + 3, y + 11);
    doc.text("998877", margin + 3, y + 15);
    doc.text("ISO 9001:2015", margin + 3, y + 20);
    
    doc.setTextColor(black[0], black[1], black[2]);
    doc.line(78, y + 15, 132, y + 15);
    doc.setFont("helvetica", "bold");
    doc.text("Dr. Gustavo Cunha Carvalho da Silva", 105, y + 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text("Médico", 105, y + 24, { align: "center" });
    doc.text("CRM-BA 11182 / RQE 12122", 105, y + 28, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.text("Validação Digital:", 185, y + 6, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("Chave: 8F9A-2B3C-4D5E-6F7G", 185, y + 11, { align: "right" });
    
    try {
      const qrUrl = `${window.location.origin}/?token=${exam.id}`;
      const qrCodeData = await QRCode.toDataURL(qrUrl, { margin: 0 });
      doc.addImage(qrCodeData, "PNG", 155, y + 14, 15, 15);
    } catch (e) {
      console.error(e);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(black[0], black[1], black[2]);
      doc.text("[ QR CODE ]", 162, y + 22, { align: "center" });
    }
    
    // text at bottom
    y += 35;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text("Documento emitido eletronicamente conforme Resolução RDC nº 302/2005 da ANVISA. A chave de segurança garante a integridade e autoria deste laudo.", pageWidth/2, y, { align: "center" });

    doc.save(`laudo_${exam.id}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto pt-10 pb-10 p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Meus Exames</h1>
        <button onClick={onLogout} className="p-2 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
          Sair
        </button>
      </div>
      
      {/* Prominent Action */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 text-center">
        <h2 className="text-lg font-semibold mb-2">Exame disponível para download</h2>
        <button 
          onClick={downloadPDF}
          className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          Baixar Laudo Oficial (PDF)
        </button>
      </div>

      {/* Visual Preview */}
      <div className="bg-white p-8 border border-slate-200 shadow-xl rounded-lg mx-auto max-w-2xl text-slate-900">
        <div className="border-b border-slate-300 pb-4 mb-4 text-center">
          <h2 className="text-xl font-bold">{ "MÉDICO CENTER" }</h2>
          <p className="text-xs">CNPJ: 40.740.466/0001-48 | Praca Antonio Muniz, 73, Centro, Ilheus, BA - CEP 45653-210</p>
          <div className="flex justify-between mt-4 text-xs">
            <span>Protocolo (OS): {exam.id}</span>
            <span>Emissão: {exam.dateEmissao}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase border-b border-slate-300 pb-1 mb-2">1. Identificação do Paciente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <p className="col-span-1 sm:col-span-3"><strong>Nome:</strong> {exam.paciente}</p>
            <p><strong>Nascimento:</strong> {exam.nascimento}</p>
            <p><strong>Sexo:</strong> {exam.sexo}</p>
            <p className="col-span-1 sm:col-span-3"><strong>Documento (CPF):</strong> {exam.cpf}</p>
          </div>
        </div>
        
        <div className="text-[10px] text-slate-500 border-t pt-2 mt-8 text-center">
          <p>Validação Digital: Chave 8F9A-2B3C-4D5E-6F7G</p>
        </div>
      </div>
    </div>
  );
}
