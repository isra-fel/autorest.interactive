import { contextBridge, ipcRenderer } from 'electron';
import * as jsonPath from 'jsonpath';
import { ElectronApi } from './contract';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';

const electronApi: ElectronApi = {
    jsonPath,
    remote: {
        evalSync<T>(expression: string): T {
            return ipcRenderer.sendSync('remoteEval', expression) as T;
        },
        readFileSync(uri: string): string {
            return ipcRenderer.sendSync('readFile', uri);
        }
    },
    fs: {
        writeFileSync(path: string, data: string): void {
            fs.writeFileSync(path, data);
        },
        mkdtempSync(prefix: string): string {
            return fs.mkdtempSync(prefix);
        }
    },
    path: {
        join: path.join.bind(path)
    },
    childProcess: {
        exec: cp.exec.bind(cp)
    }
};

contextBridge.exposeInMainWorld('electronApi', electronApi);
// window.electronApi = electronApi;
