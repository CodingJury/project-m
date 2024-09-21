import { SubmitHandler, useForm } from "react-hook-form"
import PageLayout from "../../components/layout/PageLayout"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import calculateGCD from "../../utils/scripts/gcd.script";
import { useState } from "react";
import GcdTable from "../../components/custom/gcd/GcdTable";
import GcdResult from "../../components/custom/gcd/GcdResult";

const gcdSchema = z.object({
  gcd: z
    .string()
    .refine(value => {
      const numbers = value.split(",").map(Number);
      return numbers.length == 2;
    }, "Please enter only 2 integers separated by commas")
    
    .refine(value => {
      const numbers = value.split(",").map(Number);
      return numbers.every(num => !isNaN(num));
    }, "Please enter only valid numbers separated by commas")
    
    .refine(value => {
      const numbers = value.split(",").map(Number);
      return numbers.every(num => num > 0);
    }, "Every number must be greater than 0")
});

type GcdFormValues = z.infer<typeof gcdSchema>;

const GcdPage = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<GcdFormValues>({
    resolver: zodResolver(gcdSchema),
    defaultValues: {
      gcd: "980,9000"
    },
    mode: "onChange"
  })

  const [dataToVisualize, setDataToVisualize] = useState<any | null>(null)

  const onSubmit: SubmitHandler<GcdFormValues> = (data) => {
    const nums = data.gcd.split(",").map(Number)
    const allData = calculateGCD([nums[0], nums[1]])
    setDataToVisualize({...allData, gcdString: `${nums[0]},${nums[1]}`})
  }

  return (
    <PageLayout headerName="GCD">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[clamp(350px,60vw,450px)] border p-5 m-3 rounded-lg shadow-lg flex flex-col gap-4">
          <InputField
            label="GCD String"
            {...register('gcd')}
            placeholder="980,9000"
            error={errors.gcd?.message}
            autoComplete="off"
            autoFocus
            required
          />

          <Button type="submit" disabled={!!errors.gcd}>Calculate</Button>
        </form>

        {dataToVisualize && (
            <div className="border p-6 m-3 rounded-lg shadow-lg">
              <GcdTable steps={dataToVisualize.steps}/>
            </div>
        )}
        {dataToVisualize && (
            <div className="border p-6 m-3 rounded-lg shadow-lg">
              <GcdResult gcdString={dataToVisualize.gcdString} gcd={dataToVisualize.gcd} />
            </div>
        )}
      </div>
    </PageLayout>
  )
}

export default GcdPage