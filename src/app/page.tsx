import SurveyForm from "@/components/survey-form";
import ToggleTheme from "@/components/toggle-theme";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex bg-background sticky top-0 border-b border-border w-screen h-16 items-center">
        <div className="w-40 h-1/2 ml-4"></div>
        <div className="flex w-full justify-center text-xl">Survey</div>
        <div className="w-60 h-1/2 mr-4">
          <ToggleTheme />
        </div>
      </div>
      <div className="mx-32 py-20">
        <SurveyForm />
      </div>
    </main>
  )
}
