import fs from 'fs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readJson(path: string): any {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

export function readText(path: string): string {
    return fs.readFileSync(path, 'utf8')
}

export function writeText(path: string, content: string) {
    fs.writeFileSync(path, content)
}

export function fileExist(path: string) {
    return fs.existsSync(path)
}

export function rmDir(path: string) {
    fs.rmSync(path, { recursive: true, force: true })
}

export function mkDir(path: string) {
    fs.mkdirSync(path, { recursive: true })
}

export function copyFile(from: string, to: string) {
    fs.cpSync(from, to)
}

export function copyDir(from: string, to: string) {
    fs.cpSync(from, to, { recursive: true })
}

export function renameFile(from: string, to: string) {
    fs.renameSync(from, to)
}
