import { useEffect, useRef } from 'react';

interface PixelatedImageProps {
    src: string;
    alt: string;
    pixelSize?: number;
    className?: string;
}

export function PixelatedImage({ src, alt, pixelSize = 8, className = "" }: PixelatedImageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            // Define o tamanho real que o canvas vai ter na tela
            const width = img.width;
            const height = img.height;

            canvas.width = width;
            canvas.height = height;

            // Passo 1: Desenha a imagem reduzida (isso cria os "blocos" de pixels)
            const scaledWidth = Math.max(1, Math.floor(width / pixelSize));
            const scaledHeight = Math.max(1, Math.floor(height / pixelSize));

            // Desativa qualquer suavização/antialiasing do navegador
            ctx.imageSmoothingEnabled = false;

            // Desenha miniatura
            ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

            // Passo 2: Estica a miniatura de volta ao tamanho original sem suavizar
            ctx.drawImage(
                canvas,
                0, 0, scaledWidth, scaledHeight,
                0, 0, width, height
            );
        };
    }, [src, pixelSize]);

    return (
        <canvas
            ref={canvasRef}
            role={alt ? 'img' : undefined}
            aria-label={alt}
            aria-hidden={alt ? undefined : true}
            className={`w-full h-full object-contain ${className}`}
            style={{ imageRendering: 'pixelated' }}
        />
    );
}