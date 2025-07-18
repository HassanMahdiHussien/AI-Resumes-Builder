import React, { FC, useCallback, useMemo, useRef } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dot, EllipsisVertical, FileText, Globe, Lock, DownloadCloud, Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "@/hooks/use-toast";
import { formatFileName } from "@/lib/helper";
import PreviewModal from "../PreviewModal";
import { ResumeInfoProvider } from "@/context/resume-info-provider";

interface PropType {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  themeColor: string | null;
  thumbnail: string | null;
  updatedAt: string;
}

const ResumeItem: FC<PropType> = ({
  documentId,
  status,
  title,
  themeColor,
  thumbnail,
  updatedAt,
}) => {
  const router = useRouter();

  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    const formattedDate = format(updatedAt, "MMM dd,yyyy");
    return formattedDate;
  }, [updatedAt]);

  const gotoDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  const previewRef = useRef<any>(null);
  const [openPreview, setOpenPreview] = React.useState(false);

  const handleDownload = useCallback(async () => {
    const resumeElement = document.getElementById("resume-preview-id");
    if (!resumeElement) {
      toast({
        title: "Error",
        description: "Could not download",
        variant: "destructive",
      });
      return;
    }
    const fileName = formatFileName(title);
    try {
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(fileName);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error generating PDF:",
        variant: "destructive",
      });
    }
  }, [title]);

  const gradients = [
    "from-[#FF6F3C]/30 via-[#FFD464]/30 to-[#3C8DFF]/30",
    "from-[#3C8DFF]/30 via-[#FFD464]/30 to-[#FF6F3C]/30",
    "from-[#FFD464]/30 via-[#FF6F3C]/30 to-[#3C8DFF]/30",
    "from-[#3C8DFF]/30 via-[#FF6F3C]/30 to-[#FFD464]/30",
  ];
  // اختر تدرج لوني بناءً على documentId أو العنوان أو الترتيب
  const gradientIndex = Math.abs((documentId || title || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % gradients.length;

  return (
    <div
      role="button"
      className={`
        cursor-pointer max-w-[220px] w-full min-h-[260px]
        border 
        rounded-2xl transition-all
        hover:border-primary
        hover:shadow-lg
        shadow-primary
        bg-gradient-to-br ${gradients[gradientIndex]}
      `}
      onClick={gotoDoc}
      style={{ borderColor: themeColor || "" }}
    >
      <div
        className="flex flex-col w-full h-full items-center rounded-2xl justify-center bg-transparent dark:bg-secondary"
      >
        <div
          className="w-full flex flex-1 px-1
         pt-2"
        >
          <div
            className="w-full flex flex-1 bg-white
          dark:bg-gray-700
          rounded-t-lg justify-center
           items-center
          "
          >
            {thumbnail ? (
              <div
                className="
              relative w-full h-full 
              rounded-t-lg
              overflow-hidden
              "
              >
                <Image
                  fill
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full
                  object-cover
                  object-top rounded-t-lg
                                  "
                />
              </div>
            ) : (
              <FileText size="30px" />
            )}
          </div>
        </div>

        {/* {Body Content} */}
        <div
          className="shrink w-full border-t pt-2 
              pb-[9px]
              px-[9px]
        "
        >
          <div
            className="flex items-center 
          justify-between"
          >
            <h5
              className="
                      font-semibold text-sm mb-[2px]
                      truncate block w-[200px]
                      "
            >
              {title}
            </h5>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground" onClick={e => e.stopPropagation()}>
                  <EllipsisVertical size="20px" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={e => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => router.push(`/dashboard/document/${documentId}/edit`)}>
                  <Pencil size="16px" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/preview/${documentId}/resume`)}>
                  <Eye size="16px" /> View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>
                  <DownloadCloud size="16px" /> Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.replace(`/dashboard/document/${documentId}/edit?trash=1`)} className="text-red-500">
                  <Trash2 size="16px" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {openPreview && (
              <ResumeInfoProvider>
                <PreviewModal open={openPreview} onOpenChange={setOpenPreview} documentId={documentId} />
              </ResumeInfoProvider>
            )}
          </div>
          <div
            className="flex items-center
          !text-[12px] font-medium 
          text-muted-foreground
          "
          >
            <span
              className="
                      flex items-center gap-[2px]
                      "
            >
              {status === "private" ? (
                <>
                  <Lock size="12px" />
                  Private
                </>
              ) : (
                <>
                  <Globe size="12px" className="text-primary" />
                  Public
                </>
              )}
            </span>
            <Dot size="15px" />
            <span>{docDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;
