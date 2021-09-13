import { memo } from "react";
import Button from "../../components/Button";
import { Dragons } from "../../services/ResponseManage";
import { DateFormat } from "../../utils";

interface ListProps {
  resultData: Dragons[];
  openModal(id: number): void;
  handleSaveData(id: number): void;
}

export const ListDataComponent = ({resultData, openModal, handleSaveData} : ListProps) => {
  return (
    <>
      {resultData.length > 0 && resultData.map((value) => (
        <div className="dashboard-listData" key={value.id}>
          <div className="listData-container">
            <div className="listData-info"><span>Nome:</span> {value.name.toLowerCase()}</div>
            <div className="listData-info"><span>Tipo:</span> {value.type.toLowerCase()}</div>
            <div className="listData-info"><span>Data de criação:</span> {DateFormat(value.createdAt)}</div>
          </div>
          <div className="listData-btn">
            <Button onClick={() => openModal(Number(value.id))}>Remover</Button>
            <Button onClick={() => handleSaveData(Number(value.id))}>Alterar/Detalhes</Button>
          </div>
        </div>
      ))}
    </>
  );
}
  
export const ListData = memo(ListDataComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.resultData, nextProps.resultData)
})