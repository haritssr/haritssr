import type { ReactNode } from "react";

import Section from "@/components/Section";
import katexify from "@/utils/katexify";

function InlineMath({ expression }: { expression: string }) {
  return (
    <span className="whitespace-nowrap">{katexify(expression, false)}</span>
  );
}

function MathBlock({ expression }: { expression: string }) {
  return (
    <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
      {katexify(expression, true)}
    </div>
  );
}

function Rule({ children, title }: { children: ReactNode; title: string }) {
  return (
    <li className="border-border space-y-4 border-t pt-6">
      <h3 className="text-foreground text-lg font-semibold">{title}</h3>
      {children}
    </li>
  );
}

export default function IntegralRules() {
  return (
    <Section
      className="text-muted max-w-3xl text-base"
      title="Where the basic integration rules come from"
      description={
        <>
          Every indefinite-integral rule can be checked by differentiating its
          answer. If <InlineMath expression="F'(x)=f(x)" />, then{" "}
          <InlineMath expression={String.raw`\int f(x)\,dx=F(x)+C`} />. The
          constant <InlineMath expression="C" /> is needed because
          differentiating any constant gives zero.
        </>
      }
    >
      <ol className="space-y-8">
        <Rule title="1. Constants, multiples, and sums">
          <p>
            Differentiation distributes across sums and constant multiples. It
            also turns <InlineMath expression="cx" /> into the constant{" "}
            <InlineMath expression="c" />. Reverse those three facts together:
          </p>
          <MathBlock
            expression={String.raw`\begin{aligned}\frac{d}{dx}\bigl(AF(x)+BG(x)+cx\bigr)&=Af(x)+Bg(x)+c\\[4pt]\int\bigl(Af(x)+Bg(x)+c\bigr)\,dx&=AF(x)+BG(x)+cx+C\end{aligned}`}
          />
          <p>
            Here <InlineMath expression="F'=f" /> and{" "}
            <InlineMath expression="G'=g" />. This is why you can integrate a
            polynomial one term at a time.
          </p>
        </Rule>

        <Rule title="2. Powers">
          <p>
            The derivative power rule lowers an exponent by one. To reverse it,
            raise the exponent first, then divide by the new exponent:
          </p>
          <MathBlock
            expression={String.raw`\begin{aligned}\frac{d}{dx}\left(\frac{x^{n+1}}{n+1}\right)&=\frac{(n+1)x^n}{n+1}=x^n\\[4pt]\int x^n\,dx&=\frac{x^{n+1}}{n+1}+C,\qquad n\ne-1\end{aligned}`}
          />
          <p>
            For example, <InlineMath expression={String.raw`\int x^2\,dx`} />{" "}
            becomes <InlineMath expression={String.raw`x^3/3+C`} />. The rule
            cannot use <InlineMath expression="n=-1" /> because that would
            divide by zero. Apply it on an interval where the power is defined.
          </p>
        </Rule>

        <Rule title="3. The reciprocal becomes a logarithm">
          <p>
            The missing power-rule case has its own antiderivative. On either
            side of zero, the derivative of the logarithm of absolute value is
            the reciprocal:
          </p>
          <MathBlock
            expression={String.raw`\frac{d}{dx}\ln|x|=\frac{1}{x}\quad(x\ne0)\qquad\Longrightarrow\qquad\int\frac{1}{x}\,dx=\ln|x|+C`}
          />
          <p>
            Work on an interval that does not cross zero, where the integrand is
            defined.
          </p>
        </Rule>

        <Rule title="4. Exponentials">
          <p>
            The natural exponential differentiates to itself. For any other
            positive base, differentiation introduces a logarithm factor, so
            integration must divide by it:
          </p>
          <MathBlock
            expression={String.raw`\begin{aligned}\frac{d}{dx}e^x&=e^x&\int e^x\,dx&=e^x+C\\[4pt]\frac{d}{dx}a^x&=a^x\ln a&\int a^x\,dx&=\frac{a^x}{\ln a}+C\end{aligned}\qquad(a>0,\ a\ne1)`}
          />
        </Rule>

        <Rule title="5. Basic trigonometric functions">
          <p>
            The familiar derivative identities supply the antiderivatives. In
            particular, differentiating cosine introduces a minus sign, so
            integrating sine needs one too:
          </p>
          <MathBlock
            expression={String.raw`\frac{d}{dx}\sin x=\cos x,\qquad\frac{d}{dx}\cos x=-\sin x,\qquad\frac{d}{dx}\tan x=\sec^2x`}
          />
          <p>Reverse each identity to obtain the integration rules:</p>
          <MathBlock
            expression={String.raw`\begin{aligned}\int\cos x\,dx&=\sin x+C\\[4pt]\int\sin x\,dx&=-\cos x+C\\[4pt]\int\sec^2x\,dx&=\tan x+C\end{aligned}`}
          />
          <p>
            These identities hold on intervals where the functions are defined;
            in particular, <InlineMath expression={String.raw`\tan x`} /> and{" "}
            <InlineMath expression={String.raw`\sec^2x`} /> are undefined where{" "}
            <InlineMath expression={String.raw`\cos x=0`} />.
          </p>
        </Rule>

        <Rule title="6. Substitution reverses the chain rule">
          <p>
            If an inner function appears along with its derivative, treat the
            inner function as a new variable. The chain rule explains why this
            works:
          </p>
          <MathBlock
            expression={String.raw`\begin{aligned}\frac{d}{dx}F(g(x))&=F'(g(x))g'(x)=f(g(x))g'(x)\\[4pt]\int f(g(x))g'(x)\,dx&=F(g(x))+C\end{aligned}`}
          />
          <p>
            For <InlineMath expression={String.raw`u=x^2`} />, we have{" "}
            <InlineMath expression={String.raw`du=2x\,dx`} />. The integral then
            becomes a familiar cosine rule:
          </p>
          <MathBlock
            expression={String.raw`\int 2x\cos(x^2)\,dx=\int\cos u\,du=\sin u+C=\sin(x^2)+C`}
          />
        </Rule>

        <Rule title="7. Integration by parts reverses the product rule">
          <p>
            A product is different: differentiating it creates two terms.
            Integrate the product rule and move one term to the other side:
          </p>
          <MathBlock
            expression={String.raw`\begin{aligned}\frac{d}{dx}(uv)&=u'v+uv'\\[4pt]d(uv)&=u\,dv+v\,du\\[4pt]\int u\,dv&=uv-\int v\,du\end{aligned}`}
          />
          <p>
            Choose <InlineMath expression="u=x" /> and{" "}
            <InlineMath expression={String.raw`dv=e^x\,dx`} />. Then{" "}
            <InlineMath expression="du=dx" /> and{" "}
            <InlineMath expression="v=e^x" />:
          </p>
          <MathBlock
            expression={String.raw`\int xe^x\,dx=xe^x-\int e^x\,dx=xe^x-e^x+C`}
          />
        </Rule>

        <Rule title="8. Why endpoint subtraction gives a definite integral">
          <p>
            Let <InlineMath expression={String.raw`A(x)=\int_a^x f(t)\,dt`} />{" "}
            be the area accumulated up to <InlineMath expression="x" />. If{" "}
            <InlineMath expression="f" /> is continuous, the extra area over a
            very short interval is approximately its width times{" "}
            <InlineMath expression="f(x)" />. Shrinking that width gives:
          </p>
          <MathBlock
            expression={String.raw`A'(x)=\lim_{h\to0}\frac{1}{h}\int_x^{x+h}f(t)\,dt=f(x)`}
          />
          <p>
            So <InlineMath expression="A" /> and any antiderivative{" "}
            <InlineMath expression="F" /> differ only by a constant. Because{" "}
            <InlineMath expression="A(a)=0" />, that constant is{" "}
            <InlineMath expression="-F(a)" />. At the upper bound:
          </p>
          <MathBlock
            expression={String.raw`A(x)=F(x)-F(a)\qquad\Longrightarrow\qquad\int_a^b f(x)\,dx=F(b)-F(a)`}
          />
        </Rule>
      </ol>
    </Section>
  );
}
