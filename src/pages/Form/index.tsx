import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from '../../components/Button';
import { createDragons, updateDragons } from '../../services/api';
import { UseToast } from "../../hooks/toast";
import './styles.css';

interface FormProps {
  name: string | undefined;
  type: string | undefined;
  date: string | undefined;
  cancelAction(): void;
  typePagesAction(type: boolean): void;
  typePages: boolean;
  idContent: number;
}

interface IFormInputs {
  dragonName: string;
  typeDragon: string;
  dateCreation?: string;
}

const schema = yup.object().shape({
  dragonName: yup.string().trim().required('O campo nome precisa ser preenchido'),
  typeDragon: yup.string().trim().required('O campo tipo precisa ser preenchido'),
});

function Form(dataProps: FormProps) {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: IFormInputs) => {
    
    try {
      const { dragonName, typeDragon} = data;
      let message = '';
      let statusResult = true;
      if (dataProps.idContent > 0) {
        const result = await updateDragons(dataProps.idContent, dragonName, typeDragon);
        if (result.status === 200) {
          message = 'Dragão atualizado com sucesso!';
        } else {
          statusResult = false;
          message = 'Não foi possível realizar atualização neste momento, por favor tente mais tarde!';
        }
        dataProps.typePagesAction(!dataProps.typePages);
      } else {
        const result = await createDragons(dragonName, typeDragon);
        if (result.status === 201) {
          message = 'Dragão criado com sucesso!';
        } else {
          statusResult = false;
          message = 'Não foi possível realizar a criação do dragão neste momento, por favor tente mais tarde!';
        }
      }

      UseToast({
        message: message,
        type: statusResult ? 'success' : 'error'
      });

      reset();
      dataProps.typePagesAction(!dataProps.typePages);
    } catch (error) {
      UseToast({
        message: 'Não foi possível realizar sua ação no momento, por favor tente novamente mais tarde!',
        type: 'error'
      });
    }
  };

  return (
    <div className="form-row">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>

        <h1>Dados do Dragão</h1>
        <label>
          Nome<span className="item-required">*</span>
        </label>
        <input type="text" {...register("dragonName", {
          required: true,
          maxLength: 20, value: dataProps.name
        })}
          placeholder="Digite o nome do dragão aqui" />
        {errors.dragonName?.message && (
          <span className="error">{errors.dragonName?.message}</span>
        )}
        
        <label>
          Tipo<span className="item-required">*</span>
        </label>
        <input type="text" {...register("typeDragon", {
          required: true,
          maxLength: 20,
          value: dataProps.type
        })} placeholder="Digite o tipo do dragão aqui" />
        {errors.typeDragon?.message && (
          <span className="error">{errors.typeDragon?.message}</span>
        )}

        {dataProps.idContent > 0 && (
          <p>
            <label>Data de criação</label>
            <input type="text" {...register("dateCreation", { required: false, value: dataProps.date })}
              disabled placeholder="Data salva automaticamente" />
          </p>
        )}

        <div className="form-btn-action">
          <Button onClick={dataProps.cancelAction}>Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
