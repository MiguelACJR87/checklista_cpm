import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const generatePDF = async (formData) => {
  try {
    // Criar um elemento temporário com o conteúdo do checklist
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.top = '0'
    tempDiv.style.width = '210mm' // A4 width
    tempDiv.style.padding = '20px'
    tempDiv.style.backgroundColor = 'white'
    tempDiv.style.fontFamily = 'Arial, sans-serif'
    
    // Gerar o HTML do checklist
    tempDiv.innerHTML = generateChecklistHTML(formData)
    
    // Adicionar ao DOM temporariamente
    document.body.appendChild(tempDiv)
    
    // Capturar como canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    
    // Remover elemento temporário
    document.body.removeChild(tempDiv)
    
    // Criar PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')
    
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    // Adicionar primeira página
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    // Adicionar páginas adicionais se necessário
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    // Gerar nome do arquivo com data/hora
    const now = new Date()
    const fileName = `checklist_veiculo_${formData.placa || 'sem_placa'}_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}.pdf`
    
    // Fazer download
    pdf.save(fileName)
    
    return { success: true, fileName }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    return { success: false, error: error.message }
  }
}

const generateChecklistHTML = (formData) => {
  return `
    <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 18px; font-weight: bold;">C.P.M</h1>
        <h2 style="margin: 5px 0; font-size: 14px;">Check List de Veículos Utilitários</h2>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
        <div>
          <strong>Data:</strong> ${formData.data || '_____'} &nbsp;&nbsp;
          <strong>Hora:</strong> ${formData.hora || '_____'}
        </div>
        <div>
          ${formData.chegada ? '☑' : '☐'} CHEGADA &nbsp;
          ${formData.redirecionamento ? '☑' : '☐'} REDIRECIONAMENTO &nbsp;
          ${formData.devolucao ? '☑' : '☐'} DEVOLUÇÃO &nbsp;
          ${formData.rotina ? '☑' : '☐'} ROTINA
        </div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; border: 1px solid #000;">
        <tr>
          <td style="border: 1px solid #000; padding: 5px; width: 25%;"><strong>OBSERVADOR:</strong> ${formData.observador || ''}</td>
          <td style="border: 1px solid #000; padding: 5px; width: 25%;"><strong>PLACA:</strong> ${formData.placa || ''}</td>
          <td style="border: 1px solid #000; padding: 5px; width: 25%;"><strong>MODELO:</strong> ${formData.modelo || ''}</td>
          <td style="border: 1px solid #000; padding: 5px; width: 25%;"><strong>LOCADORA:</strong> ${formData.locadora || ''}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px;"><strong>KM:</strong> ${formData.km || ''}</td>
          <td style="border: 1px solid #000; padding: 5px;"><strong>C.C.:</strong> ${formData.cc || ''}</td>
          <td style="border: 1px solid #000; padding: 5px;"><strong>LOCALIDADE:</strong> ${formData.localidade || ''}</td>
          <td style="border: 1px solid #000; padding: 5px;"><strong>SUPERVISOR:</strong> ${formData.supervisor || ''}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px;"><strong>CONDUTOR:</strong> ${formData.condutor || ''}</td>
          <td style="border: 1px solid #000; padding: 5px;"><strong>TELEFONE:</strong> ${formData.telefone || ''}</td>
          <td style="border: 1px solid #000; padding: 5px;" colspan="2"><strong>COMBUSTÍVEL:</strong> ${formData.combustivel || ''}</td>
        </tr>
      </table>
      
      <div style="margin-bottom: 15px;">
        <strong>IRREGULARIDADES:</strong> 
        ${formData.n_arranhado ? '☑' : '☐'} N=ARRANHADO &nbsp;
        ${formData.o_amassado ? '☑' : '☐'} O=AMASSADO &nbsp;
        ${formData.x_quebrado ? '☑' : '☐'} X=QUEBRADO
      </div>
      
      <div style="margin-bottom: 15px;">
        <strong>ACESSÓRIOS QUE O CARRO POSSUI:</strong><br>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 5px;">
          <div>${formData.bagag ? '☑' : '☐'} BAGAGEIRO</div>
          <div>${formData.antena ? '☑' : '☐'} ANTENA</div>
          <div>${formData.triangulo ? '☑' : '☐'} TRIÂNGULO</div>
          <div>${formData.macaco ? '☑' : '☐'} MACACO</div>
          <div>${formData.ch_de_roda ? '☑' : '☐'} CH DE RODA</div>
          <div>${formData.farois_auxiliares ? '☑' : '☐'} FARÓIS AUXILIARES</div>
          <div>${formData.extintor ? '☑' : '☐'} EXTINTOR</div>
          <div>${formData.tapetes ? '☑' : '☐'} TAPETES</div>
          <div>${formData.lacre_placa ? '☑' : '☐'} LACRE PLACA</div>
          <div>${formData.ar_cond ? '☑' : '☐'} AR COND</div>
          <div>${formData.ventilador ? '☑' : '☐'} VENTILADOR</div>
          <div>${formData.radio ? '☑' : '☐'} RÁDIO</div>
        </div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        <tr>
          <td style="border: 1px solid #000; padding: 5px; width: 33%; vertical-align: top;">
            <strong>SISTEMA ELÉTRICO</strong><br>
            ${formData.falha_motor_partida ? '☑' : '☐'} FALHA MOTOR PARTIDA<br>
            ${formData.painel ? '☑' : '☐'} PAINEL<br>
            ${formData.buzina ? '☑' : '☐'} BUZINA<br>
            ${formData.luzes_internas ? '☑' : '☐'} LUZES INTERNAS<br>
            ${formData.farol ? '☑' : '☐'} FAROL<br>
            ${formData.limpador_de_para_brisa ? '☑' : '☐'} LIMPADOR DE PARA-BRISA<br>
            ${formData.setas ? '☑' : '☐'} SETAS<br>
            ${formData.velocimetro ? '☑' : '☐'} VELOCÍMETRO
          </td>
          <td style="border: 1px solid #000; padding: 5px; width: 33%; vertical-align: top;">
            <strong>FREIOS</strong><br>
            ${formData.freios_baixo ? '☑' : '☐'} BAIXO<br>
            ${formData.freios_puxando ? '☑' : '☐'} PUXANDO<br>
            ${formData.freios_trepidando ? '☑' : '☐'} TREPIDANDO<br>
            ${formData.freios_nao_segura ? '☑' : '☐'} NÃO SEGURA<br><br>
            
            <strong>DOCT VEÍCULO</strong><br>
            ${formData.doct_vencido ? '☑' : '☐'} VENCIDO<br>
            ${formData.doct_faltando ? '☑' : '☐'} FALTANDO
          </td>
          <td style="border: 1px solid #000; padding: 5px; width: 34%; vertical-align: top;">
            <strong>EIXO/SUSP. TRAS.</strong><br>
            ${formData.eixo_puxando ? '☑' : '☐'} PUXANDO<br>
            ${formData.eixo_trepidando ? '☑' : '☐'} TREPIDANDO<br>
            ${formData.eixo_batendo ? '☑' : '☐'} BATENDO<br>
            ${formData.eixo_com_folga ? '☑' : '☐'} COM FOLGA<br>
            ${formData.eixo_arriado ? '☑' : '☐'} ARRIADO<br><br>
            
            <strong>MOTOR/REFRIGERAÇÃO</strong><br>
            ${formData.motor_sem_forca ? '☑' : '☐'} SEM FORÇA<br>
            ${formData.motor_oleo_baixo ? '☑' : '☐'} ÓLEO BAIXO<br>
            ${formData.motor_batendo ? '☑' : '☐'} BATENDO<br>
            ${formData.motor_vazando_agua_oleo ? '☑' : '☐'} VAZANDO ÁGUA/ÓLEO<br>
            ${formData.motor_aquecendo ? '☑' : '☐'} AQUECENDO
          </td>
        </tr>
      </table>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        <tr>
          <td style="border: 1px solid #000; padding: 5px; text-align: center;"><strong>PNEUS DIANTEIROS</strong></td>
          <td style="border: 1px solid #000; padding: 5px; text-align: center;"><strong>PNEUS TRASEIROS</strong></td>
          <td style="border: 1px solid #000; padding: 5px; text-align: center;"><strong>ESTEPE</strong></td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px; text-align: center;">
            ${formData.pneus_dianteiros_bom ? '☑' : '☐'} BOM &nbsp;
            ${formData.pneus_dianteiros_medio ? '☑' : '☐'} MÉDIO &nbsp;
            ${formData.pneus_dianteiros_ruim ? '☑' : '☐'} RUIM
          </td>
          <td style="border: 1px solid #000; padding: 5px; text-align: center;">
            ${formData.pneus_traseiros_bom ? '☑' : '☐'} BOM &nbsp;
            ${formData.pneus_traseiros_medio ? '☑' : '☐'} MÉDIO &nbsp;
            ${formData.pneus_traseiros_ruim ? '☑' : '☐'} RUIM
          </td>
          <td style="border: 1px solid #000; padding: 5px; text-align: center;">
            ${formData.pneus_estepe_bom ? '☑' : '☐'} BOM &nbsp;
            ${formData.pneus_estepe_medio ? '☑' : '☐'} MÉDIO &nbsp;
            ${formData.pneus_estepe_ruim ? '☑' : '☐'} RUIM
          </td>
        </tr>
      </table>
      
      <div style="margin-bottom: 15px;">
        <strong>ENTREGUE POR:</strong> ${formData.entregue_por || '_'.repeat(50)}<br><br>
        <strong>RECEBIDO POR:</strong> ${formData.recebido_por || '_'.repeat(50)}
      </div>
      
      ${formData.veiculo_substituido ? `
      <div style="margin-bottom: 15px;">
        <strong>VEÍCULO SUBSTITUÍDO:</strong> ${formData.veiculo_substituido}
      </div>
      ` : ''}
      
      ${formData.anotacoes ? `
      <div style="margin-bottom: 15px;">
        <strong>ANOTAÇÕES:</strong><br>
        <div style="border: 1px solid #000; padding: 10px; min-height: 60px;">
          ${formData.anotacoes}
        </div>
      </div>
      ` : ''}
      
      <div style="margin-top: 30px;">
        <strong>ASSINATURA CONDUTOR:</strong> ${formData.assinatura_condutor || '_'.repeat(50)}
      </div>
      
      <div style="margin-top: 20px; text-align: center; font-size: 10px;">
        <em>Todos os campos devem ser preenchidos de forma legível.</em>
      </div>
    </div>
  `
}

