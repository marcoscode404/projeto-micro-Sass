export default function getDownloadBlob(name: string, file: Blob) {
    if (name.endsWith('.xml')) file = new Blob([file], { type: 'aplication/xml' });

    const href = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}