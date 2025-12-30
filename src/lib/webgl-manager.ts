class WebGLContextManager {
  private static instance: WebGLContextManager;
  private activeContexts: Set<string> = new Set();
  private readonly MAX_CONTEXTS = 6;

  private constructor() {}

  static getInstance(): WebGLContextManager {
    if (!WebGLContextManager.instance) {
      WebGLContextManager.instance = new WebGLContextManager();
    }
    return WebGLContextManager.instance;
  }

  canActivate(id: string): boolean {
    if (this.activeContexts.has(id)) {
      return true;
    }
    return this.activeContexts.size < this.MAX_CONTEXTS;
  }

  activate(id: string): boolean {
    if (this.activeContexts.size < this.MAX_CONTEXTS) {
      this.activeContexts.add(id);
      return true;
    }
    return false;
  }

  deactivate(id: string): void {
    this.activeContexts.delete(id);
  }

}

export const webglManager = WebGLContextManager.getInstance();
