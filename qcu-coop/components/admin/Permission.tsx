import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  handlePermission: (password: string) => Promise<boolean | undefined> ,
}

const Permission = ({handlePermission}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const isAllowed = await handlePermission(data.password);
    if(!isAllowed) {
      console.log("Not allowed boi")
    } else {
      console.log('allowed ka')
    }

  };

  return (
    <>
      Please type your password:
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("password")} id="password" type="password" />
          <Button type="submit">Submit</Button>
        </form>
    </>
  );
};

export default Permission;
