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

export const webFrameworkValToLabel: Record<string, string> = {}

webFrameworkValToLabel["express"] = "ExpressJS"
webFrameworkValToLabel["next"] = "NextJS"
webFrameworkValToLabel["nuxt"] = "NuxtJS"
webFrameworkValToLabel["astro"] = "Astro"
webFrameworkValToLabel["react"] = "React"
webFrameworkValToLabel["flask"] = "Flask"
webFrameworkValToLabel["django"] = "Django"
webFrameworkValToLabel["angular"] = "Angular"
webFrameworkValToLabel["jquery"] = "JQuery"
webFrameworkValToLabel["rails"] = "Ruby on Rails"
webFrameworkValToLabel["bootstrap"] = "Bootstrap"
webFrameworkValToLabel["tailwind"] = "TailwindCSS"
webFrameworkValToLabel["fastapi"] = "FastAPI"
webFrameworkValToLabel["aspnet"] = "ASP.NET"
webFrameworkValToLabel["svelte"] = "Svelte"
webFrameworkValToLabel["vite"] = "Vite"
webFrameworkValToLabel["htmx"] = "HTMX"
webFrameworkValToLabel["laravel"] = "Laravel"

export const web_framework_vals: readonly string[] = [...Object.keys(webFrameworkValToLabel)] as const

export type WebFrameworkResponse = {
  value: string,
  experience: number,
  recommendation: number,
}

export type WebFrameworkEntry = {
  readonly value: string,
  readonly label: string,
}

const WebFrameworkError = ({errObject, index, className} : {errObject: FieldErrors, index: number, className?: string}) => {
  if (errObject) {
    if (errObject.webFrameworks) {
      // @ts-ignore
      const errArray = errObject.webFrameworks as any[]
      if (errArray[index]) {
        const err = errArray[index]
        if (err.experience) {
          return <FormError text={err.experience.message} className={className} />
        }
        if (err.recommendation) {
          return <FormError text={err.recommendation.message} className={className} />
        }
      }
    }
  }
  return null
}

export const WebFrameworksHeader = () => {
  return (
    <div className="hidden lg:flex flex-row justify-between items-center gap-4 w-full h-14">
      <Label className="w-[214px] text-muted-foreground shrink-0">
        Framework/Library
      </Label>
      <Separator orientation="vertical" className="h-10" />
      <div className="grow max-w-[322px]">
        <Label className="text-muted-foreground shrink-0">
          Describe your proficiency in the framework/library
        </Label>
      </div>
      <Separator orientation="vertical" className="h-10" />
      <div className="grow max-w-[322px]">
        <Label className="text-muted-foreground shrink-0">
        How likely are you to recommend the framework/library?
        </Label>
      </div>
      <div className="w-[1px] h-full"></div>
      <div className="w-8 h-full"></div>
    </div>
  )
}

export const WebFrameworks = ({webFrameworks, form, field} : {
  webFrameworks: readonly WebFrameworkEntry[],
  form: UseFormReturn<formFields, any, undefined>,
  field: ControllerRenderProps<formFields, "webFrameworks">
  }) => {
  return (
    <div className="lg:flex lg:flex-col gap-4">
      {field.value.map((selected_language, index) => {
        return (

          <>
          {form.formState.isSubmitted && <WebFrameworkError errObject={form.formState.errors} index={index}
          className="lg:hidden"/>}
          <div
            className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:w-full pt-2 lg:gap-12 max-lg:mb-8"
            key={selected_language.value}
          >
            <div className="flex flex-row gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-52 justify-between shrink-0"
                >
                  {webFrameworkValToLabel[selected_language.value]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0">
                <Command className="max-h-72">
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {webFrameworks
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
            <div className="flex items-center lg:hidden">
              <X
                width={60}
                className="text-muted-foreground
                hover:text-primary hover:cursor-pointer"
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

            <Label className="text-muted-foreground lg:hidden">
              Describe your proficiency in the language
            </Label>
            <div className="flex flex-col items-center lg:grow lg:max-w-[300px] max-lg:pl-4 max-lg:w-80">
              <div className="flex flex-row w-[105%] justify-between">
              <p className="text-xs whitespace-pre-wrap">Beginner</p>
              <p className="text-xs whitespace-pre-wrap">Intermediate</p>
              <p className="text-xs whitespace-pre-wrap">  Expert</p>
              </div>
              <div className="flex flex-row w-[94%] justify-between mb-[3px]">
                <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
              </div>
              <Slider
                name="experience"
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

            <Label className="text-muted-foreground lg:hidden">
              How likely are you to recommend the language?
            </Label>
            <div className="flex flex-col items-center touch-none lg:grow lg:max-w-[300px] max-lg:pl-4 max-lg:w-80">
              <div className="flex flex-row w-[105%] justify-between">
              <p className="text-xs whitespace-pre-wrap">Never       </p>
              <p className="text-xs whitespace-pre-wrap">Maybe</p>
              <p className="text-xs whitespace-pre-wrap">Absolutely</p>
              </div>
              <div className="flex flex-row w-[94%] justify-between mb-[3px]">
                <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
              </div>
              <Slider
                name="recommendation"
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

            <div className="flex items-center">
              <X
                className="max-lg:hidden shrink-0 text-muted-foreground
                hover:text-primary hover:cursor-pointer"
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
          {form.formState.isSubmitted && <WebFrameworkError errObject={form.formState.errors} index={index}
          className="max-lg:hidden"/>}
          </>
        );
      })}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-52 justify-between text-muted-foreground bg-muted"
          >
            {"Select language"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <Command className="max-h-72">
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {webFrameworks
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
