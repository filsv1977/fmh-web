import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import type { WishDto } from "../../api/model";
import dayjs from "dayjs";
import { Icon } from "../../components/icon";
import { Link } from "react-router-dom";
import { Status } from "../../components/cells/status";
import { ExecuteDate } from "../../components/cells/executeDate";
import { statuses } from "../../common/statuses";

const columnHelper = createColumnHelper<WishDto>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "№",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor("title", {
    header: () => "Просьба",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor(
    // чтобы поиск работал по форматированной дате
    (row) =>
      row.planExecuteDate
        ? dayjs(row.planExecuteDate).format("DD.MM.YYYY")
        : "",
    {
      id: "planExecuteDate",
      header: () => "Выполнить до",
      cell: (props) => <ExecuteDate row={props.row} date={props.getValue()} />,
    }
  ),
  columnHelper.accessor(
    ({ patient }) => {
      const { firstName, lastName, middleName } = patient || {};
      return (
        [firstName, lastName, middleName].filter(Boolean).join(" ") || "Хоспис"
      );
    },
    {
      id: "patient",
      header: () => "Для кого",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    (row) => {
      const status = statuses[row.status as keyof WishDto["status"]];
      if (status) return status;
      else return "";
    },
    {
      id: "status",
      header: () => "Статус",
      cell: (props) => <Status row={props.row} />,
    }
  ),
  columnHelper.accessor("executor", {
    header: () => "Испонитель",
    cell: (props) => props.getValue()?.lastName,
  }),
  columnHelper.accessor((row) => row.id, {
    id: "actions",
    header: () => "",
    enableSorting: false,
    cell: (props) => <Actions id={`${props.getValue()}`} />,
  }),
];

const Actions = ({ id }: { id: string }) => {
  return (
    <Link to={id}>
      <Icon.ActionDefault24 />
    </Link>
  );
};
