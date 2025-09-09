// Integração com Google Sheets usando Google Apps Script Web App
// Esta implementação usa um endpoint público do Google Apps Script para enviar dados

export const saveToGoogleSheets = async (formData) => {
  try {
    // Obter URL do localStorage
    const GOOGLE_SCRIPT_URL = localStorage.getItem('googleScriptUrl')
    
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('URL do Google Apps Script não configurada')
    }
    
    // Preparar dados para envio
    const dataToSend = {
      timestamp: new Date().toISOString(),
      ...formData
    }
    
    // Fazer requisição para o Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Necessário para Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    })
    
    // Como usamos no-cors, não podemos ler a resposta
    // Assumimos sucesso se não houve erro
    return { 
      success: true, 
      message: 'Dados enviados para Google Sheets com sucesso!' 
    }
    
  } catch (error) {
    console.error('Erro ao enviar dados para Google Sheets:', error)
    return { 
      success: false, 
      error: error.message 
    }
  }
}

// Função alternativa usando Google Sheets API (requer autenticação OAuth)
export const saveToGoogleSheetsAPI = async (formData, accessToken, spreadsheetId) => {
  try {
    const SHEETS_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append`
    
    // Converter dados do formulário em array para planilha
    const rowData = [
      new Date().toISOString(), // Timestamp
      formData.observador || '',
      formData.placa || '',
      formData.modelo || '',
      formData.locadora || '',
      formData.km || '',
      formData.cc || '',
      formData.localidade || '',
      formData.condutor || '',
      formData.supervisor || '',
      formData.telefone || '',
      formData.data || '',
      formData.hora || '',
      formData.chegada ? 'Sim' : 'Não',
      formData.redirecionamento ? 'Sim' : 'Não',
      formData.devolucao ? 'Sim' : 'Não',
      formData.rotina ? 'Sim' : 'Não',
      formData.combustivel || '',
      formData.n_arranhado ? 'Sim' : 'Não',
      formData.o_amassado ? 'Sim' : 'Não',
      formData.x_quebrado ? 'Sim' : 'Não',
      formData.anotacoes || '',
      formData.assinatura_condutor || ''
    ]
    
    const requestBody = {
      values: [rowData],
      majorDimension: 'ROWS',
      valueInputOption: 'RAW'
    }
    
    const response = await fetch(`${SHEETS_API_URL}?valueInputOption=RAW`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    
    if (response.ok) {
      const result = await response.json()
      return { 
        success: true, 
        message: 'Dados salvos no Google Sheets com sucesso!',
        result 
      }
    } else {
      throw new Error(`Erro HTTP: ${response.status}`)
    }
    
  } catch (error) {
    console.error('Erro ao salvar no Google Sheets:', error)
    return { 
      success: false, 
      error: error.message 
    }
  }
}

// Função para criar cabeçalhos na planilha (executar uma vez)
export const createSheetsHeaders = () => {
  return [
    'Timestamp',
    'Observador',
    'Placa',
    'Modelo',
    'Locadora',
    'KM',
    'C.C.',
    'Localidade',
    'Condutor',
    'Supervisor',
    'Telefone',
    'Data',
    'Hora',
    'Chegada',
    'Redirecionamento',
    'Devolução',
    'Rotina',
    'Combustível',
    'Arranhado',
    'Amassado',
    'Quebrado',
    'Anotações',
    'Assinatura Condutor'
  ]
}

// Instruções para configurar Google Apps Script
export const getGoogleAppsScriptInstructions = () => {
  return `
INSTRUÇÕES PARA CONFIGURAR GOOGLE APPS SCRIPT:

1. Acesse https://script.google.com/
2. Clique em "Novo projeto"
3. Cole o código abaixo no editor:

function doPost(e) {
  try {
    // ID da sua planilha do Google Sheets
    const SPREADSHEET_ID = 'SEU_ID_DA_PLANILHA_AQUI';
    
    // Abrir a planilha
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Parsear dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Criar linha com os dados
    const row = [
      data.timestamp || new Date().toISOString(),
      data.observador || '',
      data.placa || '',
      data.modelo || '',
      data.locadora || '',
      data.km || '',
      data.cc || '',
      data.localidade || '',
      data.condutor || '',
      data.supervisor || '',
      data.telefone || '',
      data.data || '',
      data.hora || '',
      data.chegada ? 'Sim' : 'Não',
      data.redirecionamento ? 'Sim' : 'Não',
      data.devolucao ? 'Sim' : 'Não',
      data.rotina ? 'Sim' : 'Não',
      data.combustivel || '',
      data.n_arranhado ? 'Sim' : 'Não',
      data.o_amassado ? 'Sim' : 'Não',
      data.x_quebrado ? 'Sim' : 'Não',
      data.anotacoes || '',
      data.assinatura_condutor || ''
    ];
    
    // Adicionar linha à planilha
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

4. Salve o projeto com um nome (ex: "Checklist Veículos")
5. Clique em "Implantar" > "Nova implantação"
6. Escolha "Aplicativo da web"
7. Configure:
   - Executar como: Eu
   - Quem tem acesso: Qualquer pessoa
8. Clique em "Implantar"
9. Copie a URL fornecida e substitua no código JavaScript
10. Crie uma planilha no Google Sheets e copie o ID da URL
11. Substitua SEU_ID_DA_PLANILHA_AQUI pelo ID real

CABEÇALHOS SUGERIDOS PARA A PLANILHA:
${createSheetsHeaders().join(' | ')}
  `
}

