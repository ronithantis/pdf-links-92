import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Download, Printer, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PRINT_ROOT_ID = "pdf-print-root";
const PRINT_BODY_CLASS = "pdf-printing";

interface PdfViewerProps {
  url: string;
  title: string;
  isFullscreen?: boolean;
  showToolbar?: boolean;
}

const clearPrintRoot = () => {
  document.body.classList.remove(PRINT_BODY_CLASS);
  document.getElementById(PRINT_ROOT_ID)?.remove();
};

/** Fetch the PDF as a blob and trigger a browser download */
export const downloadPdf = async (url: string, filename?: string) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename || url.split("/").pop() || "document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
};

/** Render all PDF pages to canvases and print the current page, avoiding popups and blocked tabs */
export const printPdf = async (url: string) => {
  try {
    clearPrintRoot();

    const res = await fetch(url);
    const data = await res.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data }).promise;

    const printRoot = document.createElement("div");
    printRoot.id = PRINT_ROOT_ID;
    printRoot.className = "pdf-print-root";
    document.body.appendChild(printRoot);

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.8 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) continue;

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      canvas.className = "pdf-print-page";

      await page.render({ canvas, canvasContext: context, viewport }).promise;

      const pageWrapper = document.createElement("div");
      pageWrapper.className = "pdf-print-page-wrapper";
      pageWrapper.appendChild(canvas);
      printRoot.appendChild(pageWrapper);
    }

    const cleanup = () => {
      window.removeEventListener("afterprint", cleanup);
      clearPrintRoot();
    };

    window.addEventListener("afterprint", cleanup, { once: true });
    document.body.classList.add(PRINT_BODY_CLASS);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    });
  } catch {
    downloadPdf(url, "document.pdf");
  }
};

const PdfViewer = ({ url, title, showToolbar = true }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [error, setError] = useState(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(false);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setError(true);
  }, []);

  if (error) {
    return (
      <div className="h-full min-h-[320px] flex flex-col items-center justify-center gap-4 p-6 text-center" dir="rtl">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">לא ניתן לטעון את הטופס.</p>
        <Button onClick={() => downloadPdf(url, `${title}.pdf`)}>
          <Download className="h-4 w-4 ml-2" />
          הורד את הטופס
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {numPages > 0 && (
        <div className="flex items-center justify-center gap-2 py-2 px-4 border-b bg-muted/30 shrink-0 flex-wrap" dir="rtl">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[80px] text-center">
              עמוד {pageNumber} מתוך {numPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
              disabled={scale <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setScale((s) => Math.min(3, s + 0.2))}
              disabled={scale >= 3}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          {showToolbar && (
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => downloadPdf(url, `${title}.pdf`)}
              >
                <Download className="h-3.5 w-3.5 ml-1" />
                הורד
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => printPdf(url)}
              >
                <Printer className="h-3.5 w-3.5 ml-1" />
                הדפס
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-auto flex justify-center bg-muted/20 p-4">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex flex-col items-center justify-center gap-3 py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">טוען טופס...</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
