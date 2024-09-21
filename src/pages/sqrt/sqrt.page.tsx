import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button"
import InputField from "../../components/common/InputField"
import PageLayout from "../../components/layout/PageLayout"
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import calculateSQRT from "../../utils/scripts/sqrt.script";
import SqrtTable from "../../components/custom/sqrt/SqrtTable";

const sqrtSchema = z.object({
  sqrt: z
    .number()
    .min(1, "Please enter number greater than 0")
});

type SqrtFormValues = z.infer<typeof sqrtSchema>;

const SqrtPage = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<SqrtFormValues>({
    resolver: zodResolver(sqrtSchema),
    defaultValues: {
      sqrt: 2334
    },
    mode: "onChange"
  })

  const [dataToVisualize, setDataToVisualize] = useState<any | null>(null)

  const onSubmit: SubmitHandler<SqrtFormValues> = (data) => {
    console.log(data)
    // const numbers = data.sqrt.split(",").map(Number)
    const allData = calculateSQRT(data.sqrt)
    // console.log(allData)
    setDataToVisualize({...allData})
  }

  return (
    <PageLayout headerName="Sqrt">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[clamp(350px,60vw,450px)] border p-5 m-3 rounded-lg shadow-lg flex flex-col gap-4">
          <InputField
            label="Sqrt String"
            type="number"
            {...register('sqrt', {
              valueAsNumber: true
            })}
            placeholder="216"
            error={errors.sqrt?.message}
            autoComplete="off"
            autoFocus
            required
          />

          <Button type="submit" disabled={!!errors.sqrt}>Calculate</Button>
        </form>

        {dataToVisualize && (
          <div className="border p-6 m-3 rounded-lg shadow-lg">
            <SqrtTable pairs={dataToVisualize.pairs} steps={dataToVisualize.steps}/>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default SqrtPage