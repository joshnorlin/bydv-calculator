import CalculatorInformation from '../components/informationComponents/CalculatorInformation';
import AnimatedSection from '../components/visualComponents/AnimatedSection';
import useDecisionTreeSteps from '../hooks/useDecisionTreeSteps';

function HomePage() {
  const steps = useDecisionTreeSteps();

  // Filter only visible steps
  const visibleSteps = steps.filter(step => step.show);

  return (
    <div className="flex flex-col items-center flex-1 px-2">
      <CalculatorInformation />
      <div className="w-full max-w-2xl mt-8 space-y-8">
        {visibleSteps.map((step, index) => (
          <AnimatedSection key={step.key} delay={index * 200}>
            {step.render()}
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
