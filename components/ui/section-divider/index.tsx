import LeftMarker from "@/public/assets/section-divider/left-marker.svg"
import RightMarker from "@/public/assets/section-divider/right-marker.svg"
import Divider from "@/public/assets/section-divider/divider.svg"

export function SectionDivider() {
  return (
    <div className="flex w-full items-center">
      <LeftMarker className="-mr-2.5 flex-shrink-0" />
      <Divider className="flex-1" />
      <RightMarker className="-ml-2.5 mb-1.5 flex-shrink-0" />
    </div>
  )
}
