export interface ModelContext {

}

export interface DiagnosticsTarget {
  trace(data: string) : void;
}

export class ConsoleDiagnosticsTarget implements DiagnosticsTarget {
  trace(message: string): void {
      console.log(message);
  }
}

export class AlertDiagnosticsTarget implements DiagnosticsTarget {
  trace(message: string): void {
    alert(message);
  }
}

export class DiagnosticsModelContext implements ModelContext {
  constructor(private targets: DiagnosticsTarget[]) { }

  traceError() {}

  traceWarning() {}

  traceInfo () {}

  traceVerbose() {} 

  // logs / metrics / traces / status 

  trace(
    app: string, 
    area: string,
    severity: string,  // or logLevel (1 .. 5)
    message: string,
    data?: any
    ) {
    this.targets.forEach( t => {
        t.trace(message);
    });
  }
}
