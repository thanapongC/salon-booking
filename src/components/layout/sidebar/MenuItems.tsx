import {
  CollectionsBookmark,
  Group,
  Assessment,
  Badge,
  Shower,
  Settings,
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
      href: `/${localActive}/protected/admin/dashboard`,
      children: [
        {
          id: uniqueId(),
          title: "แผงควบคุม",
          href: `/${localActive}/protected/admin/dashboard`,
        },
        {
          id: uniqueId(),
          title: "การจองทั้งหมด",
          href: `/${localActive}/protected/admin/dashboard/bookings`,
        },
        {
          id: uniqueId(),
          title: "รอยืนยันการจอง",
          href: `/${localActive}/protected/admin/dashboard/waiting-confirm`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "ตั้งค่าร้านค้า",
      icon: Settings,
      href: `/${localActive}/protected/admin/settings`,
    },
    {
      id: uniqueId(),
      title: "จัดการบริการ",
      icon: Shower,
      href: `/${localActive}/protected/admin/services`,
    },
    {
      id: uniqueId(),
      title: "จัดการพนักงาน",
      icon: Badge,
      href: `/${localActive}/protected/admin/employees`,
    },
    {
      id: uniqueId(),
      title: "รายงาน",
      icon: Assessment,
      href: `/${localActive}/protected/admin/reports`,
    },
  ];
};
