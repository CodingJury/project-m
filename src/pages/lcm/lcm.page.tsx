import InputField from "../../components/common/InputField"
import Button from "../../components/common/Button"
import { SubmitHandler, useForm } from "react-hook-form"
import PageLayout from "../../components/layout/PageLayout"
import { useState } from "react"
import LcmTable from "../../components/custom/lcm/LcmTable"
import LcmResult from "../../components/custom/lcm/LcmResult"
import calculateLCM from "../../utils/scripts/lcm.script.v2"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const lcmSchema = z.object({
  lcm: z
    .string()
    .refine(value => {
      const numbers = value.split(",").map(Number);
      return numbers.length >= 2;
    }, "Please enter at least 2 integers separated by commas")
    
    .refine(value => {
      const numbers = value.split(",").map(Number);
      return numbers.every(num => !isNaN(num));
    }, "Please enter valid integers separated by commas")
    
    .refine(value => {
      const numbers = value.split(",").map(Number);
      return numbers.every(num => num > 0);
    }, "Every number must be greater than 0")
    
    .refine(value => {
      const numbers = value.split(",").map(Number);
      return numbers.every(num => num < 1_000_000_000_000);
    }, "Large Number")
});

type LcmFormValues = z.infer<typeof lcmSchema>;

type LcmVisualizerProps  = {
  steps: (number | null)[][];
  divisors: number[];
  result: number;
} & {
  numbers: number[]
}

const LcmPage = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<LcmFormValues>({
    resolver: zodResolver(lcmSchema),
    defaultValues: {
      lcm: "6,12,17"
    },
    mode: "onChange"
  })

  const [dataToVisualize, setDataToVisualize] = useState<LcmVisualizerProps | null>(null)

  const onSubmit: SubmitHandler<LcmFormValues> = (data) => {
    const numbers = data.lcm.split(",").map(Number)
    const allData = calculateLCM(numbers)
    setDataToVisualize({...allData, numbers})
  }

  return (
    <PageLayout headerName="LCM">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[clamp(350px,60vw,450px)] border p-5 m-3 rounded-lg shadow-lg flex flex-col gap-4">
          <InputField
            label="LCM String"
            {...register('lcm')}
            placeholder="6,12,17"
            error={errors.lcm?.message}
            autoComplete="off"
            autoFocus
            required
          />

          <Button type="submit" disabled={!!errors.lcm}>Calculate</Button>
        </form>

        {dataToVisualize && (
            <div className="border p-6 m-3 rounded-lg shadow-lg">
              <LcmTable steps={dataToVisualize.steps}/>
            </div>
        )}
        {dataToVisualize && (
            <div className="border p-6 m-3 rounded-lg shadow-lg">
              <LcmResult numbers={dataToVisualize.numbers} divisors={dataToVisualize.divisors} result = {dataToVisualize.result} />
            </div>
        )}
      </div>
    </PageLayout>
  )
}

export default LcmPage