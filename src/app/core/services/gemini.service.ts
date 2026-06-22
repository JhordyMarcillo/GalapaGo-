import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, GenerativeModel, ChatSession } from '@google/generative-ai';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private chatSession: ChatSession;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction: 'Eres GalapaBot, un guía turístico experto en las Islas Galápagos enfocado en promover el turismo responsable, la protección ecológica y la filosofía ecuatoriana del "Buen Vivir". Eres amable, entusiasta y usas algunas expresiones ecuatorianas coloquiales de vez en cuando (como "¡Qué bacán!", "ñaño", "chévere"). Siempre priorizas la conservación y las reglas del Parque Nacional. Tus respuestas deben ser concisas (máximo 3 oraciones) y amigables. Además, funcionas como un TRADUCTOR MULTILINGÜE para turistas extranjeros. Si el usuario te habla en inglés u otro idioma, respóndele en ese idioma o tradúcele modismos ecuatorianos de forma clara. Si te piden que traduzcas algo, hazlo de inmediato.'
    });

    this.chatSession = this.model.startChat({ history: [] });
  }

  async sendMessage(msg: string): Promise<string> {
    try {
      const result = await this.chatSession.sendMessage(msg);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.warn('Gemini no disponible, usando respuesta local:', error?.message);
      // Fallback a respuestas locales cuando la API falla
      return this.respuestaLocal(msg);
    }
  }

  resetChat() {
    this.chatSession = this.model.startChat({ history: [] });
  }

  // Respuestas locales de calidad como fallback
  private respuestaLocal(consulta: string): string {
    const q = consulta.toLowerCase();

    if (q.includes('fauna') || q.includes('animal') || q.includes('tortuga') || q.includes('lobo') || q.includes('iguana') || q.includes('pinguino') || q.includes('pingüino')) {
      return 'En Galápagos encontrarás especies únicas en el mundo: tortugas gigantes, iguanas marinas, pingüinos de Galápagos y lobos marinos. ¡La regla de oro es mantener al menos 2 metros de distancia y jamás alimentarlos!';
    }
    if (q.includes('regla') || q.includes('norma') || q.includes('prohibido') || q.includes('basura') || q.includes('residuo')) {
      return 'El Parque Nacional prohíbe dejar basura, fumar en áreas naturales, extraer arena o rocas, y usar plásticos de un solo uso. Usa solo protector solar biodegradable y lleva siempre tu bolsa de residuos. ¡El Buen Vivir empieza por el respeto!';
    }
    if (q.includes('comida') || q.includes('gastronomia') || q.includes('comer') || q.includes('plato') || q.includes('restaurante')) {
      return '¡Qué bacán la gastronomía local! Te recomiendo el Ceviche de Canchalagua en San Cristóbal, el Encebollado de pescado en Santa Cruz y los Bolones de verde. Siempre consume en mercados locales para apoyar a la comunidad, ñaño.';
    }
    if (q.includes('monumento') || q.includes('lugar') || q.includes('visitar') || q.includes('isla') || q.includes('sitio')) {
      return 'Los sitios imperdibles son: la Estación Charles Darwin (Santa Cruz), el Muro de las Lágrimas (Isabela), el León Dormido / Kicker Rock (San Cristóbal) y la Post Office Bay (Floreana). ¡Cada isla tiene su magia!';
    }
    if (q.includes('precio') || q.includes('costo') || q.includes('cuanto') || q.includes('cuánto') || q.includes('dinero')) {
      return 'La entrada al Parque Nacional cuesta $100 USD para turistas extranjeros y $6 USD para ecuatorianos. Además debes pagar la Tarjeta de Tránsito (TCT) de $20 USD. Los tours varían entre $80 y $250 USD según la actividad.';
    }
    if (q.includes('clima') || q.includes('temperatura') || q.includes('lluvia') || q.includes('tiempo')) {
      return 'Galápagos tiene dos estaciones: la cálida y húmeda de enero a junio (25-31°C), ideal para snorkeling; y la fresca y seca de julio a diciembre (18-25°C), perfecta para avistamiento de aves. ¡Ambas son chéveres!';
    }
    if (q.includes('transporte') || q.includes('avion') || q.includes('avión') || q.includes('barco') || q.includes('lancha') || q.includes('vuelo') || q.includes('llegar')) {
      return 'Se llega en avión desde Quito o Guayaquil a los aeropuertos de Baltra o San Cristóbal. Entre islas se viaja en lanchas rápidas (~$30 USD, 2 horas) o en vuelos inter-islas (~$170 USD, 30 minutos).';
    }
    if (q.includes('cultura') || q.includes('frase') || q.includes('expresion') || q.includes('expresión') || q.includes('saludo')) {
      return '"¡Qué bacán!" significa ¡Qué genial!, "Ñaño/ñaña" es como decirle hermano a un amigo cercano, y "De ley" quiere decir "Por supuesto". ¡Los locales te acogerán con mucho cariño!';
    }
    if (q.includes('empacar') || q.includes('ropa') || q.includes('llevar') || q.includes('maleta') || q.includes('equipo')) {
      return 'Lleva ropa ligera, zapatos cómodos para caminar sobre rocas volcánicas, tu propia botella de agua reutilizable, protector solar biodegradable y ropa para nadar. ¡Recuerda que los plásticos de un solo uso están prohibidos!';
    }
    if (q.includes('horario') || q.includes('hora') || q.includes('abre') || q.includes('cierra')) {
      return 'La Estación Charles Darwin abre de 6:00 AM a 6:00 PM. Los sitios del Parque Nacional operan de 6:00 AM a 6:00 PM. Las lanchas inter-islas salen generalmente a las 7:00 AM y 2:00 PM.';
    }
    if (q.includes('hola') || q.includes('buenos') || q.includes('buenas') || q.includes('saludos') || q.includes('hello')) {
      return '¡Hola ñaño! Soy GalapaBot 🐢, tu guía del Buen Vivir en Galápagos. Puedo ayudarte con información sobre fauna, normativas, gastronomía, transporte, precios y más. ¿Qué quieres saber?';
    }
    if (q.includes('traduce') || q.includes('traductor') || q.includes('traducir') || q.includes('english') || q.includes('inglés') || q.includes('ingles')) {
      return 'Of course! As GalapaBot, I can translate phrases and explain local terms like "¡Qué bacán!" (How cool!) or "Ñaño" (Brother/close friend). Just type what you need translated! (Note: Gemini AI is currently offline, so my translations are limited to basic local phrases right now).';
    }

    return 'Es una pregunta interesante, pero en este momento mi conexión con la IA está limitada. Puedo ayudarte con: 🐾 Fauna, 📜 Normativas del Parque, 🍽️ Gastronomía, 🏛️ Lugares, 💰 Precios, 🌤️ Clima, ✈️ Transporte o 🎭 Frases Locales. ¡Prueba uno de los botones de arriba!';
  }
}
