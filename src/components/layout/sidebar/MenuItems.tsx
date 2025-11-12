import {
  CollectionsBookmark,
  ContentPaste,
  Group,
  Handyman,
  Inventory,
  PinDrop,
  Report,
} from "@mui/icons-material";
import { IconHome } from "@tabler/icons-react";

import { uniqueId } from "lodash";
import { useTranslations, useLocale } from "next-intl";

export const useMenuItems = () => {
  const t = useTranslations("Menus");
  const localActive = useLocale();

  return [
    {
      id: uniqueId(),
      title: "แผงควบคุม",
      icon: IconHome,
      href: `/${localActive}/protected/dashboard`,
      children: [
        {
          id: uniqueId(),
          title: "แผงควบคุม",
          href: `/${localActive}/protected/dashboard`,
        },
        {
          id: uniqueId(),
          title: "การจองทั้งหมด",
          href: `/${localActive}/protected/dashboard/bookings`,
        },
        {
          id: uniqueId(),
          title: "รอยืนยันการจอง",
          href: `/${localActive}/protected/dashboard/waiting-confirm`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "ตั้งค่าร้านค้า",
      icon: Group,
      href: `/${localActive}/protected/settings`,
    },
    {
      id: uniqueId(),
      title: "จัดการบริการ",
      icon: Group,
      href: `/${localActive}/protected/services`,
    },
    {
      id: uniqueId(),
      title: "จัดการพนักงาน",
      icon: Group,
      href: `/${localActive}/protected/employees`,
    },
    {
      id: uniqueId(),
      title: "รายงาน",
      icon: Group,
      href: `/${localActive}/protected/reports`,
    },
  ];
};
