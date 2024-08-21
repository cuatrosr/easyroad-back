export enum TipoEvento {
  LLAMADA = 'llamada',
  APERTURA_PUERTA = 'apertura_puerta',
  OBTURACION_BOTON = 'obturacion_boton',
  RECONOCIMIENTO_PERSONA = 'reconocimiento_persona',
  BATERIA_BAJA = 'bateria_baja',
}

export enum EstadoEventoLlamada {
  INICIO = '1',
  OCUPADO = '2',
  FINALIZO = '3',
  RECHAZADO = '4',
}

export enum EstadoEventoAperturaPuerta {
  ABIERTA = '1',
  CERRADA = '2',
}

export enum EstadoEventoObturacionBoton {
  ACCIONADO = '1',
}

export enum EstadoEventoReconocimientoPersona {
  PERSONA_RECONOCIDA = '1',
}

export const EstadoPorTipoEvento: Record<
  TipoEvento,
  Record<string, string> | null
> = {
  [TipoEvento.LLAMADA]: EstadoEventoLlamada,
  [TipoEvento.APERTURA_PUERTA]: EstadoEventoAperturaPuerta,
  [TipoEvento.OBTURACION_BOTON]: EstadoEventoObturacionBoton,
  [TipoEvento.RECONOCIMIENTO_PERSONA]: EstadoEventoReconocimientoPersona,
  [TipoEvento.BATERIA_BAJA]: null,
};

export function obtenerMensajeEstado(
  tipoEvento: TipoEvento,
  estado: string,
): string {
  const estadosPermitidos = EstadoPorTipoEvento[tipoEvento];

  if (estadosPermitidos === null) {
    return `${estado}`;
  }

  const mensaje = Object.keys(estadosPermitidos).find(
    (key) => estadosPermitidos[key] === estado,
  );

  return mensaje ?? 'Estado no válido';
}
