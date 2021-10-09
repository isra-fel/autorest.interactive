import { ChildProcess, ExecException } from 'child_process';
import * as jsonPath from 'jsonpath';

declare global {
    interface Window {
        electronApi: ElectronApi;
    }
}

export interface ElectronApi {
    jsonPath: typeof jsonPath;
    remote: RemoteOperations;
    fs: FileSystemOperations;
    path: PathOperations;
    childProcess: ChildProcessOperations;
}

export interface RemoteOperations {
    evalSync<T>(expression: string): T;
    readFileSync(uri: string): string;
}

export interface FileSystemOperations {
    writeFileSync(path: string, data: string): void;
    mkdtempSync(prefix: string): string;
}

export interface PathOperations {
    join(...paths: string[]): string;
}

export interface ChildProcessOperations {
    exec(
        command: string,
        callback?: (
            error: ExecException | null,
            stdout: string,
            stderr: string
        ) => void
    ): ChildProcess;
}
