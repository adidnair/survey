import { ControllerRenderProps, FieldErrors, UseFormReturn } from "react-hook-form"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { FormError } from "../myui/form-error";
import { formFields } from "../survey-form";


export const valToLabel: Record<string, string> = {}

valToLabel["py"] = "Python"
valToLabel["js"] = "JavaScript"
valToLabel["ts"] = "TypeScript"
valToLabel["c"] = "C"
valToLabel["cpp"] = "C++"
valToLabel["go"] = "Go"
valToLabel["rust"] = "Rust"

export const language_vals: readonly string[] = [
  "py",
  "js",
  "ts",
  "c",
  "cpp",
  "go",
  "rust",
] as const;

export type LanguageResponse = {
  value: string,
  experience: number,
  recommendation: number,
}

export type LanguageEntry = {
  readonly value: string,
  readonly label: string,
}

const LanguageError = ({errObject, index} : {errObject: FieldErrors, index: number}) => {
  if (errObject) {
    if (errObject.languages) {
      // @ts-ignore
      const errArray = errObject.languages as any[]
      if (errArray[index]) {
        const err = errArray[index]
        if (err.experience) {
          return <FormError text={err.experience.message} />
        }
        if (err.recommendation) {
          return <FormError text={err.recommendation.message} />
        }
      }
    }
  }
  return null
}

export const LanguagesHeader = () => {
  return (
    <div className="flex flex-row items-center gap-4 w-full h-14">
      <Label className="w-[210px] text-muted-foreground shrink-0">
        Language
      </Label>
      <Separator orientation="vertical" className="h-10" />
      <Label className="w-[332px] text-muted-foreground shrink-0">
        Rate your experience with the language
      </Label>
      <Separator orientation="vertical" className="h-10" />
      <Label className="text-muted-foreground shrink-0">
        How likely are you to recommend the language?
      </Label>
    </div>
  )
}

export const Languages = ({languages, form, field} : {
  languages: readonly LanguageEntry[],
  form: UseFormReturn<formFields, any, undefined>,
  field: ControllerRenderProps<formFields, "languages">
  }) => {
  return (
    <div className="flex flex-col gap-4">
      {field.value.map((selected_language, index) => {
        return (
          <>
          <div
            className="flex flex-row pt-2 gap-12"
            key={selected_language.value}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between shrink-0"
                >
                  {valToLabel[selected_language.value]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {languages
                      .filter((l) => {
                        if (
                          l.value ===
                          field.value[index].value
                        )
                          return true;
                        for (const sl of field.value) {
                          if (sl.value === l.value) return false;
                        }
                        return true;
                      })
                      .map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue(field.name,
                              field.value.map((l, li) => {
                                if (li === index)
                                  return {
                                    value: language.value,
                                    experience: l.experience,
                                    recommendation:
                                      l.recommendation,
                                  };
                                return l;
                              })
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value ===
                                field.value[index].value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex justify-center">
              <Slider
                name="experience"
                className="w-80 shrink-0"
                min={0}
                max={100}
                step={1}
                defaultValue={[50]}
                onValueCommit={(val) => {
                  form.setValue(field.name,
                    field.value.map((l, li) => {
                      if (li === index)
                        return {
                          value: l.value,
                          experience: val[0],
                          recommendation: l.recommendation,
                        };
                      return l;
                    })
                  );
                }}
              />
            </div>

            <div className="flex justify-center">
              <Slider
                name="recommendation"
                className="w-80 shrink-0"
                min={0}
                max={100}
                step={1}
                defaultValue={[50]}
                onValueCommit={(val) => {
                  form.setValue(field.name,
                    field.value.map((l, li) => {
                      if (li === index)
                        return {
                          value: l.value,
                          experience: l.experience,
                          recommendation: val[0],
                        };
                      return l;
                    })
                  );
                }}
              />
            </div>

            <div className="w-full"></div>
            <div className="flex items-center">
              <X
                width={60}
                className="shrink-0 text-muted
              hover:text-muted-foreground hover:cursor-pointer"
                onClick={() =>
                  form.setValue(field.name,
                    field.value.filter((l) => {
                      return l.value !== selected_language.value;
                    })
                  )
                }
              />
            </div>
          </div>
          {form.formState.isSubmitted && <LanguageError errObject={form.formState.errors} index={index}/>}
          </>
        );
      })}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between text-muted-foreground bg-muted"
          >
            {"Select language"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages
                .filter((language) => {
                  for (const l of field.value) {
                    if (language.value === l.value) return false;
                  }
                  return true;
                })
                .map((language) => (
                  <CommandItem
                    value={language.label}
                    key={language.value}
                    onSelect={() => {
                      form.setValue(field.name, [
                        ...field.value,
                        {
                          value: language.value,
                          experience: -1,
                          recommendation: -1,
                        },
                      ]);
                    }}
                  >
                    {language.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
