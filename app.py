import gradio as gr
import numpy as np
import matplotlib.pyplot as plt

def model(P_s, P_g, C_f, M):
    months = np.arange(1, 61)
    break_even = (P_s * months) / (P_g + C_f)
    fig, ax = plt.subplots()
    ax.plot(months, break_even, color="#10b981", lw=3)
    ax.set_xlabel("Months of Subscription Use")
    ax.set_ylabel("Equivalent Games Purchased")
    ax.set_title("Game Subscription Break-even Curve")
    ax.grid(True, alpha=0.3)
    return fig

demo = gr.Interface(
    fn=model,
    inputs=[
        gr.Slider(5, 50, 19.99, label="Subscription Price ($)"),
        gr.Slider(20, 100, 70, label="Price per Game ($)"),
        gr.Slider(0, 20, 5, label="Friction / Transaction Cost ($)"),
        gr.Slider(1, 60, 24, step=1, label="Months of Use"),
    ],
    outputs=gr.Plot(),
    title="🎮 Game Subscription Break-even",
    description="Toggle the parameters to see when subscribing beats buying games outright."
)

demo.launch()
