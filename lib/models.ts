const AI_GATEWAY_MODELS = [
  {
    id: "alibaba/qwen-3-14b",
    name: "Qwen3-14B",
    description:
      "Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support",
    pricing: {
      input: "0.00000008",
      output: "0.00000024",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "alibaba/qwen-3-14b",
    },
    modelType: "language",
  },
  {
    id: "alibaba/qwen-3-235b",
    name: "Qwen3 235B A22B Instruct 2507",
    description:
      "Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support",
    pricing: {
      input: "0.0000002",
      output: "0.0000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "alibaba/qwen-3-235b",
    },
    modelType: "language",
  },
  {
    id: "alibaba/qwen-3-30b",
    name: "Qwen3-30B-A3B",
    description:
      "Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support",
    pricing: {
      input: "0.0000001",
      output: "0.0000003",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "alibaba/qwen-3-30b",
    },
    modelType: "language",
  },
  {
    id: "alibaba/qwen-3-32b",
    name: "Qwen 3.32B",
    description:
      "Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense and mixture-of-experts (MoE) models. Built upon extensive training, Qwen3 delivers groundbreaking advancements in reasoning, instruction-following, agent capabilities, and multilingual support",
    pricing: {
      input: "0.0000001",
      output: "0.0000003",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "alibaba/qwen-3-32b",
    },
    modelType: "language",
  },
  {
    id: "alibaba/qwen3-coder",
    name: "Qwen3 Coder 480B A35B Instruct",
    description:
      "Qwen3-Coder-480B-A35B-Instruct is Qwen's most agentic code model, featuring significant performance on Agentic Coding, Agentic Browser-Use and other foundational coding tasks, achieving results comparable to Claude Sonnet.",
    pricing: {
      input: "0.0000004",
      output: "0.0000016",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "alibaba/qwen3-coder",
    },
    modelType: "language",
  },
  {
    id: "amazon/nova-lite",
    name: "Nova Lite",
    description:
      "A very low cost multimodal model that is lightning fast for processing image, video, and text inputs.",
    pricing: {
      input: "0.00000006",
      output: "0.00000024",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "amazon/nova-lite",
    },
    modelType: "language",
  },
  {
    id: "amazon/nova-micro",
    name: "Nova Micro",
    description:
      "A text-only model that delivers the lowest latency responses at very low cost.",
    pricing: {
      input: "0.000000035",
      output: "0.00000014",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "amazon/nova-micro",
    },
    modelType: "language",
  },
  {
    id: "amazon/nova-pro",
    name: "Nova Pro",
    description:
      "A highly capable multimodal model with the best combination of accuracy, speed, and cost for a wide range of tasks.",
    pricing: {
      input: "0.0000008",
      output: "0.0000032",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "amazon/nova-pro",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Claude 3 Haiku",
    description:
      "Claude 3 Haiku is Anthropic's fastest model yet, designed for enterprise workloads which often involve longer prompts. Haiku to quickly analyze large volumes of documents, such as quarterly filings, contracts, or legal cases, for half the cost of other models in its performance tier.",
    pricing: {
      input: "0.00000025",
      output: "0.00000125",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-3-haiku",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-3-opus",
    name: "Claude 3 Opus",
    description:
      "Claude 3 Opus is Anthropic's most intelligent model, with best-in-market performance on highly complex tasks. It can navigate open-ended prompts and sight-unseen scenarios with remarkable fluency and human-like understanding. Opus shows us the outer limits of what's possible with generative AI.",
    pricing: {
      input: "0.000015",
      output: "0.000075",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-3-opus",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    description:
      "Claude 3.5 Haiku is the next generation of our fastest model. For a similar speed to Claude 3 Haiku, Claude 3.5 Haiku improves across every skill set and surpasses Claude 3 Opus, the largest model in our previous generation, on many intelligence benchmarks.",
    pricing: {
      input: "0.0000008",
      output: "0.000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-3.5-haiku",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description:
      "Claude 3.5 Sonnet strikes the ideal balance between intelligence and speed—particularly for enterprise workloads. It delivers strong performance at a lower cost compared to its peers, and is engineered for high endurance in large-scale AI deployments.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-3.5-sonnet",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    description:
      "Claude 3.7 Sonnet is the first hybrid reasoning model and Anthropic's most intelligent model to date. It delivers state-of-the-art performance for coding, content generation, data analysis, and planning tasks, building upon its predecessor Claude 3.5 Sonnet's capabilities in software engineering and computer use.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-3.7-sonnet",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-opus-4",
    name: "Claude Opus 4",
    description:
      "Claude Opus 4 is Anthropic's most powerful model yet and the best coding model in the world, leading on SWE-bench (72.5%) and Terminal-bench (43.2%). It delivers sustained performance on long-running tasks that require focused effort and thousands of steps, with the ability to work continuously for several hours—dramatically outperforming all Sonnet models and significantly expanding what AI agents can accomplish.",
    pricing: {
      input: "0.000015",
      output: "0.000075",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-opus-4",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-opus-4.1",
    name: "Claude Opus 4.1",
    description:
      "Claude Opus 4.1 is a drop-in replacement for Opus 4 that delivers superior performance and precision for real-world coding and agentic tasks. Opus 4.1 advances state-of-the-art coding performance to 74.5% on SWE-bench Verified, and handles complex, multi-step problems with more rigor and attention to detail.",
    pricing: {
      input: "0.000015",
      output: "0.000075",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-opus-4.1",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    description:
      "Claude Sonnet 4 significantly improves on Sonnet 3.7's industry-leading capabilities, excelling in coding with a state-of-the-art 72.7% on SWE-bench. The model balances performance and efficiency for internal and external use cases, with enhanced steerability for greater control over implementations. While not matching Opus 4 in most domains, it delivers an optimal mix of capability and practicality.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-sonnet-4",
    },
    modelType: "language",
  },
  {
    id: "cohere/command-a",
    name: "Command A",
    description:
      "Command A is Cohere's most performant model to date, excelling at tool use, agents, retrieval augmented generation (RAG), and multilingual use cases. Command A has a context length of 256K, only requires two GPUs to run, and has 150% higher throughput compared to Command R+ 08-2024.",
    pricing: {
      input: "0.0000025",
      output: "0.00001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "cohere",
      modelId: "cohere/command-a",
    },
    modelType: "language",
  },
  {
    id: "cohere/command-r",
    name: "Command R",
    description:
      'Command R is a large language model optimized for conversational interaction and long context tasks. It targets the "scalable" category of models that balance high performance with strong accuracy, enabling companies to move beyond proof of concept and into production.',
    pricing: {
      input: "0.00000015",
      output: "0.0000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "cohere",
      modelId: "cohere/command-r",
    },
    modelType: "language",
  },
  {
    id: "cohere/command-r-plus",
    name: "Command R+",
    description:
      "Command R+ is Cohere's newest large language model, optimized for conversational interaction and long-context tasks. It aims at being extremely performant, enabling companies to move beyond proof of concept and into production.",
    pricing: {
      input: "0.0000025",
      output: "0.00001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "cohere",
      modelId: "cohere/command-r-plus",
    },
    modelType: "language",
  },
  {
    id: "deepseek/deepseek-r1",
    name: "DeepSeek R1 0528",
    description:
      "The latest revision of DeepSeek's first-generation reasoning model",
    pricing: {
      input: "0.00000079",
      output: "0.000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "parasail",
      modelId: "deepseek/deepseek-r1",
    },
    modelType: "language",
  },
  {
    id: "deepseek/deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1 Distill Llama 70B",
    description:
      "DeepSeek-R1-Distill-Llama-70B is a distilled, more efficient variant of the 70B Llama model. It preserves strong performance across text-generation tasks, reducing computational overhead for easier deployment and research. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.",
    pricing: {
      input: "0.00000075",
      output: "0.00000099",
    },
    specification: {
      specificationVersion: "v2",
      provider: "groq",
      modelId: "deepseek/deepseek-r1-distill-llama-70b",
    },
    modelType: "language",
  },
  {
    id: "deepseek/deepseek-v3",
    name: "DeepSeek V3 0324",
    description:
      "Fast general-purpose LLM with enhanced reasoning capabilities",
    pricing: {
      input: "0.00000077",
      output: "0.00000077",
    },
    specification: {
      specificationVersion: "v2",
      provider: "baseten",
      modelId: "deepseek/deepseek-v3",
    },
    modelType: "language",
  },
  {
    id: "deepseek/deepseek-v3.1",
    name: "DeepSeek V3.1",
    description:
      "DeepSeek-V3.1 is post-trained on the top of DeepSeek-V3.1-Base, which is built upon the original V3 base checkpoint through a two-phase long context extension approach, following the methodology outlined in the original DeepSeek-V3 report. DeepSeek has expanded their dataset by collecting additional long documents and substantially extending both training phases.",
    pricing: {
      input: "0.0000001999",
      output: "0.0000008001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "chutes",
      modelId: "deepseek/deepseek-v3.1",
    },
    modelType: "language",
  },
  {
    id: "deepseek/deepseek-v3.1-base",
    name: "DeepSeek V3.1 Base",
    description:
      "DeepSeek V3.1 Base is an improved version of the DeepSeek V3 model.",
    pricing: {
      input: "0.0000001999",
      output: "0.0000008001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "chutes",
      modelId: "deepseek/deepseek-v3.1-base",
    },
    modelType: "language",
  },
  {
    id: "deepseek/deepseek-v3.1-thinking",
    name: "DeepSeek V3.1 Thinking",
    description:
      "DeepSeek-V3.1 marks DeepSeek's first step toward the agent era with revolutionary hybrid inference capabilities. Operates in two modes: Think and Non-Think. The Think variant delivers faster reasoning compared to DeepSeek-R1-0528, reaching answers more efficiently while maintaining high-quality outputs. Enhanced through specialized post-training, the model excels at tool usage and complex multi-step agent tasks.",
    pricing: {
      input: "0.00000056",
      output: "0.00000168",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepseek",
      modelId: "deepseek/deepseek-v3.1-thinking",
    },
    modelType: "language",
  },
  {
    id: "google/gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    description:
      "Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, built-in tool use, multimodal generation, and a 1M token context window.",
    pricing: {
      input: "0.00000015",
      output: "0.0000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vertex",
      modelId: "google/gemini-2.0-flash",
    },
    modelType: "language",
  },
  {
    id: "google/gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash Lite",
    description:
      "Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, built-in tool use, multimodal generation, and a 1M token context window.",
    pricing: {
      input: "0.000000075",
      output: "0.0000003",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vertex",
      modelId: "google/gemini-2.0-flash-lite",
    },
    modelType: "language",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description:
      "Gemini 2.5 Flash is a thinking model that offers great, well-rounded capabilities. It is designed to offer a balance between price and performance with multimodal support and a 1M token context window.",
    pricing: {
      input: "0.0000003",
      output: "0.0000025",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vertex",
      modelId: "google/gemini-2.5-flash",
    },
    modelType: "language",
  },
  {
    id: "google/gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    description:
      "Gemini 2.5 Flash-Lite is a balanced, low-latency model with configurable thinking budgets and tool connectivity (e.g., Google Search grounding and code execution). It supports multimodal input and offers a 1M-token context window.",
    pricing: {
      input: "0.0000001",
      output: "0.0000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vertex",
      modelId: "google/gemini-2.5-flash-lite",
    },
    modelType: "language",
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description:
      "Gemini 2.5 Pro is our most advanced reasoning Gemini model, capable of solving complex problems. It features a 2M token context window and supports multimodal inputs including text, images, audio, video, and PDF documents.",
    pricing: {
      input: "0.0000025",
      output: "0.00001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vertex",
      modelId: "google/gemini-2.5-pro",
    },
    modelType: "language",
  },
  {
    id: "google/gemma-2-9b",
    name: "Gemma 2 9B IT",
    description:
      "9 billion parameter open source model by Google fine-tuned for chat purposes. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.",
    pricing: {
      input: "0.0000002",
      output: "0.0000002",
    },
    specification: {
      specificationVersion: "v2",
      provider: "groq",
      modelId: "google/gemma-2-9b",
    },
    modelType: "language",
  },
  {
    id: "inception/mercury-coder-small",
    name: "Mercury Coder Small Beta",
    description:
      "Mercury Coder Small is ideal for code generation, debugging, and refactoring tasks with minimal latency.",
    pricing: {
      input: "0.00000025",
      output: "0.000001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "inception",
      modelId: "inception/mercury-coder-small",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3-70b",
    name: "Llama 3 70B Instruct",
    description:
      "Llama is a 70 billion parameter open source model by Meta fine-tuned for instruction following purposes. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.",
    pricing: {
      input: "0.00000059",
      output: "0.00000079",
    },
    specification: {
      specificationVersion: "v2",
      provider: "groq",
      modelId: "meta/llama-3-70b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3-8b",
    name: "Llama 3 8B Instruct",
    description:
      "Llama is a 8 billion parameter open source model by Meta fine-tuned for instruction following purposes. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.",
    pricing: {
      input: "0.00000005",
      output: "0.00000008",
    },
    specification: {
      specificationVersion: "v2",
      provider: "groq",
      modelId: "meta/llama-3-8b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3.1-70b",
    name: "Llama 3.1 70B Instruct",
    description:
      "An update to Meta Llama 3 70B Instruct that includes an expanded 128K context length, multilinguality and improved reasoning capabilities.",
    pricing: {
      input: "0.00000072",
      output: "0.00000072",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "meta/llama-3.1-70b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3.1-8b",
    name: "Llama 3.1 8B Instruct",
    description:
      "Llama 3.1 8B with 128K context window support, making it ideal for real-time conversational interfaces and data analysis while offering significant cost savings compared to larger models. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.",
    pricing: {
      input: "0.00000005",
      output: "0.00000008",
    },
    specification: {
      specificationVersion: "v2",
      provider: "groq",
      modelId: "meta/llama-3.1-8b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3.2-11b",
    name: "Llama 3.2 11B Vision Instruct",
    description:
      "Instruction-tuned image reasoning generative model (text + images in / text out) optimized for visual recognition, image reasoning, captioning and answering general questions about the image.",
    pricing: {
      input: "0.00000016",
      output: "0.00000016",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "meta/llama-3.2-11b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3.2-1b",
    name: "Llama 3.2 1B Instruct",
    description:
      "Text-only model, supporting on-device use cases such as multilingual local knowledge retrieval, summarization, and rewriting.",
    pricing: {
      input: "0.0000001",
      output: "0.0000001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "meta/llama-3.2-1b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3.2-3b",
    name: "Llama 3.2 3B Instruct",
    description:
      "Text-only model, fine-tuned for supporting on-device use cases such as multilingual local knowledge retrieval, summarization, and rewriting.",
    pricing: {
      input: "0.00000015",
      output: "0.00000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "meta/llama-3.2-3b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3.2-90b",
    name: "Llama 3.2 90B Vision Instruct",
    description:
      "Instruction-tuned image reasoning generative model (text + images in / text out) optimized for visual recognition, image reasoning, captioning and answering general questions about the image.",
    pricing: {
      input: "0.00000072",
      output: "0.00000072",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "meta/llama-3.2-90b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-3.3-70b",
    name: "Llama 3.3 70B Instruct",
    description:
      "Where performance meets efficiency. This model supports high-performance conversational AI designed for content creation, enterprise applications, and research, offering advanced language understanding capabilities, including text summarization, classification, sentiment analysis, and code generation.",
    pricing: {
      input: "0.00000072",
      output: "0.00000072",
    },
    specification: {
      specificationVersion: "v2",
      provider: "bedrock",
      modelId: "meta/llama-3.3-70b",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-4-maverick",
    name: "Llama 4 Maverick 17B 128E Instruct",
    description:
      "The Llama 4 collection of models are natively multimodal AI models that enable text and multimodal experiences. These models leverage a mixture-of-experts architecture to offer industry-leading performance in text and image understanding. Llama 4 Maverick, a 17 billion parameter model with 128 experts. Served by DeepInfra.",
    pricing: {
      input: "0.0000002",
      output: "0.0000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "meta/llama-4-maverick",
    },
    modelType: "language",
  },
  {
    id: "meta/llama-4-scout",
    name: "Llama 4 Scout 17B 16E Instruct",
    description:
      "The Llama 4 collection of models are natively multimodal AI models that enable text and multimodal experiences. These models leverage a mixture-of-experts architecture to offer industry-leading performance in text and image understanding. Llama 4 Scout, a 17 billion parameter model with 16 experts. Served by DeepInfra.",
    pricing: {
      input: "0.0000001",
      output: "0.0000003",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "meta/llama-4-scout",
    },
    modelType: "language",
  },
  {
    id: "mistral/codestral",
    name: "Mistral Codestral 25.01",
    description:
      "Mistral Codestral 25.01 is a state-of-the-art coding model optimized for low-latency, high-frequency use cases. Proficient in over 80 programming languages, it excels at tasks like fill-in-the-middle (FIM), code correction, and test generation.",
    pricing: {
      input: "0.0000003",
      output: "0.0000009",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/codestral",
    },
    modelType: "language",
  },
  {
    id: "mistral/devstral-small",
    name: "Devstral Small",
    description:
      "Devstral is an agentic LLM for software engineering tasks, making it a great choice for software engineering agents.",
    pricing: {
      input: "0.00000007",
      output: "0.00000028",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "mistral/devstral-small",
    },
    modelType: "language",
  },
  {
    id: "mistral/magistral-medium",
    name: "Magistral Medium 2506",
    description:
      "Complex thinking, backed by deep understanding, with transparent reasoning you can follow and verify. The model excels in maintaining high-fidelity reasoning across numerous languages, even when switching between languages mid-task.",
    pricing: {
      input: "0.000002",
      output: "0.000005",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/magistral-medium",
    },
    modelType: "language",
  },
  {
    id: "mistral/magistral-small",
    name: "Magistral Small 2506",
    description:
      "Complex thinking, backed by deep understanding, with transparent reasoning you can follow and verify. The model excels in maintaining high-fidelity reasoning across numerous languages, even when switching between languages mid-task.",
    pricing: {
      input: "0.0000005",
      output: "0.0000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/magistral-small",
    },
    modelType: "language",
  },
  {
    id: "mistral/ministral-3b",
    name: "Ministral 3B",
    description:
      "A compact, efficient model for on-device tasks like smart assistants and local analytics, offering low-latency performance.",
    pricing: {
      input: "0.00000004",
      output: "0.00000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/ministral-3b",
    },
    modelType: "language",
  },
  {
    id: "mistral/ministral-8b",
    name: "Ministral 8B",
    description:
      "A more powerful model with faster, memory-efficient inference, ideal for complex workflows and demanding edge applications.",
    pricing: {
      input: "0.0000001",
      output: "0.0000001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/ministral-8b",
    },
    modelType: "language",
  },
  {
    id: "mistral/mistral-large",
    name: "Mistral Large",
    description:
      "Mistral Large is ideal for complex tasks that require large reasoning capabilities or are highly specialized - like Synthetic Text Generation, Code Generation, RAG, or Agents.",
    pricing: {
      input: "0.000002",
      output: "0.000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/mistral-large",
    },
    modelType: "language",
  },
  {
    id: "mistral/mistral-saba-24b",
    name: "Mistral Saba 24B",
    description:
      "Mistral Saba 24B is a 24 billion parameter open source model by Mistral.ai. Saba is a specialized model trained to excel in Arabic, Farsi, Urdu, Hebrew, and Indic languages. Served by Groq with their custom Language Processing Units (LPUs) hardware to provide fast and efficient inference.",
    pricing: {
      input: "0.00000079",
      output: "0.00000079",
    },
    specification: {
      specificationVersion: "v2",
      provider: "groq",
      modelId: "mistral/mistral-saba-24b",
    },
    modelType: "language",
  },
  {
    id: "mistral/mistral-small",
    name: "Mistral Small",
    description:
      "Mistral Small is the ideal choice for simple tasks that one can do in bulk - like Classification, Customer Support, or Text Generation. It offers excellent performance at an affordable price point.",
    pricing: {
      input: "0.0000001",
      output: "0.0000003",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/mistral-small",
    },
    modelType: "language",
  },
  {
    id: "mistral/mixtral-8x22b-instruct",
    name: "Mixtral MoE 8x22B Instruct",
    description:
      "8x22b Instruct model. 8x22b is mixture-of-experts open source model by Mistral served by Fireworks.",
    pricing: {
      input: "0.0000012",
      output: "0.0000012",
    },
    specification: {
      specificationVersion: "v2",
      provider: "fireworks",
      modelId: "mistral/mixtral-8x22b-instruct",
    },
    modelType: "language",
  },
  {
    id: "mistral/pixtral-12b",
    name: "Pixtral 12B 2409",
    description:
      "A 12B model with image understanding capabilities in addition to text.",
    pricing: {
      input: "0.00000015",
      output: "0.00000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/pixtral-12b",
    },
    modelType: "language",
  },
  {
    id: "mistral/pixtral-large",
    name: "Pixtral Large",
    description:
      "Pixtral Large is the second model in our multimodal family and demonstrates frontier-level image understanding. Particularly, the model is able to understand documents, charts and natural images, while maintaining the leading text-only understanding of Mistral Large 2.",
    pricing: {
      input: "0.000002",
      output: "0.000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "mistral",
      modelId: "mistral/pixtral-large",
    },
    modelType: "language",
  },
  {
    id: "moonshotai/kimi-k2",
    name: "Kimi K2",
    description:
      "Kimi K2 is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It is optimized for agentic capabilities, including advanced tool use, reasoning, and code synthesis. Kimi K2 excels across a broad range of benchmarks, particularly in coding (LiveCodeBench, SWE-bench), reasoning (ZebraLogic, GPQA), and tool-use (Tau2, AceBench) tasks.",
    pricing: {
      input: "0.00000055",
      output: "0.0000022",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepinfra",
      modelId: "moonshotai/kimi-k2",
    },
    modelType: "language",
  },
  {
    id: "morph/morph-v3-fast",
    name: "Morph V3 Fast",
    description:
      "Morph offers a specialized AI model that applies code changes suggested by frontier models (like Claude or GPT-4o) to your existing code files FAST - 4500+ tokens/second. It acts as the final step in the AI coding workflow. Supports 16k input tokens and 16k output tokens.",
    pricing: {
      input: "0.0000008",
      output: "0.0000012",
    },
    specification: {
      specificationVersion: "v2",
      provider: "morph",
      modelId: "morph/morph-v3-fast",
    },
    modelType: "language",
  },
  {
    id: "morph/morph-v3-large",
    name: "Morph V3 Large",
    description:
      "Morph offers a specialized AI model that applies code changes suggested by frontier models (like Claude or GPT-4o) to your existing code files FAST - 2500+ tokens/second. It acts as the final step in the AI coding workflow. Supports 16k input tokens and 16k output tokens.",
    pricing: {
      input: "0.0000009",
      output: "0.0000019",
    },
    specification: {
      specificationVersion: "v2",
      provider: "morph",
      modelId: "morph/morph-v3-large",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description:
      "OpenAI's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks.",
    pricing: {
      input: "0.0000005",
      output: "0.0000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "openai",
      modelId: "openai/gpt-3.5-turbo",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-3.5-turbo-instruct",
    name: "GPT-3.5 Turbo Instruct",
    description:
      "Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.",
    pricing: {
      input: "0.0000015",
      output: "0.000002",
    },
    specification: {
      specificationVersion: "v2",
      provider: "openai",
      modelId: "openai/gpt-3.5-turbo-instruct",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-4-turbo",
    name: "GPT-4 Turbo",
    description:
      "gpt-4-turbo from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It has a knowledge cutoff of April 2023 and a 128,000 token context window.",
    pricing: {
      input: "0.00001",
      output: "0.00003",
    },
    specification: {
      specificationVersion: "v2",
      provider: "openai",
      modelId: "openai/gpt-4-turbo",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    description:
      "GPT 4.1 is OpenAI's flagship model for complex tasks. It is well suited for problem solving across domains.",
    pricing: {
      input: "0.000002",
      output: "0.000008",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/gpt-4.1",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 mini",
    description:
      "GPT 4.1 mini provides a balance between intelligence, speed, and cost that makes it an attractive model for many use cases.",
    pricing: {
      input: "0.0000004",
      output: "0.0000016",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/gpt-4.1-mini",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-4.1-nano",
    name: "GPT-4.1 nano",
    description:
      "GPT-4.1 nano is the fastest, most cost-effective GPT 4.1 model.",
    pricing: {
      input: "0.0000001",
      output: "0.0000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/gpt-4.1-nano",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    description:
      "GPT-4o from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It matches GPT-4 Turbo performance with a faster and cheaper API.",
    pricing: {
      input: "0.0000025",
      output: "0.00001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/gpt-4o",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o mini",
    description:
      "GPT-4o mini from OpenAI is their most advanced and cost-efficient small model. It is multi-modal (accepting text or image inputs and outputting text) and has higher intelligence than gpt-3.5-turbo but is just as fast.",
    pricing: {
      input: "0.00000015",
      output: "0.0000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/gpt-4o-mini",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    description:
      "GPT-5 is OpenAI's flagship language model that excels at complex reasoning, broad real-world knowledge, code-intensive, and multi-step agentic tasks.",
    pricing: {
      input: "0.00000125",
      output: "0.00001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "openai",
      modelId: "openai/gpt-5",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 mini",
    description:
      "GPT-5 mini is a cost optimized model that excels at reasoning/chat tasks. It offers an optimal balance between speed, cost, and capability.",
    pricing: {
      input: "0.00000025",
      output: "0.000002",
    },
    specification: {
      specificationVersion: "v2",
      provider: "openai",
      modelId: "openai/gpt-5-mini",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-5-nano",
    name: "GPT-5 nano",
    description:
      "GPT-5 nano is a high throughput model that excels at simple instruction or classification tasks.",
    pricing: {
      input: "0.00000005",
      output: "0.0000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "openai",
      modelId: "openai/gpt-5-nano",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-oss-120b",
    name: "gpt-oss-120b",
    description:
      "Extremely capable general-purpose LLM with strong, controllable reasoning capabilities",
    pricing: {
      input: "0.0000001",
      output: "0.0000005",
    },
    specification: {
      specificationVersion: "v2",
      provider: "baseten",
      modelId: "openai/gpt-oss-120b",
    },
    modelType: "language",
  },
  {
    id: "openai/gpt-oss-20b",
    name: "gpt-oss-20b",
    description:
      "A compact, open-weight language model optimized for low-latency and resource-constrained environments, including local and edge deployments",
    pricing: {
      input: "0.00000007",
      output: "0.0000003",
    },
    specification: {
      specificationVersion: "v2",
      provider: "fireworks",
      modelId: "openai/gpt-oss-20b",
    },
    modelType: "language",
  },
  {
    id: "openai/o1",
    name: "o1",
    description:
      "o1 is OpenAI's flagship reasoning model, designed for complex problems that require deep thinking. It provides strong reasoning capabilities with improved accuracy for complex multi-step tasks.",
    pricing: {
      input: "0.000015",
      output: "0.00006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/o1",
    },
    modelType: "language",
  },
  {
    id: "openai/o3",
    name: "o3",
    description:
      "OpenAI's o3 is their most powerful reasoning model, setting new state-of-the-art benchmarks in coding, math, science, and visual perception. It excels at complex queries requiring multi-faceted analysis, with particular strength in analyzing images, charts, and graphics.",
    pricing: {
      input: "0.000002",
      output: "0.000008",
    },
    specification: {
      specificationVersion: "v2",
      provider: "openai",
      modelId: "openai/o3",
    },
    modelType: "language",
  },
  {
    id: "openai/o3-mini",
    name: "o3-mini",
    description:
      "o3-mini is OpenAI's most recent small reasoning model, providing high intelligence at the same cost and latency targets of o1-mini.",
    pricing: {
      input: "0.0000011",
      output: "0.0000044",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/o3-mini",
    },
    modelType: "language",
  },
  {
    id: "openai/o4-mini",
    name: "o4-mini",
    description:
      "OpenAI's o4-mini delivers fast, cost-efficient reasoning with exceptional performance for its size, particularly excelling in math (best-performing on AIME benchmarks), coding, and visual tasks.",
    pricing: {
      input: "0.0000011",
      output: "0.0000044",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/o4-mini",
    },
    modelType: "language",
  },
  {
    id: "perplexity/sonar",
    name: "Sonar",
    description:
      "Perplexity's lightweight offering with search grounding, quicker and cheaper than Sonar Pro.",
    pricing: {
      input: "0.000001",
      output: "0.000001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "perplexity",
      modelId: "perplexity/sonar",
    },
    modelType: "language",
  },
  {
    id: "perplexity/sonar-pro",
    name: "Sonar Pro",
    description:
      "Perplexity's premier offering with search grounding, supporting advanced queries and follow-ups.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "perplexity",
      modelId: "perplexity/sonar-pro",
    },
    modelType: "language",
  },
  {
    id: "perplexity/sonar-reasoning",
    name: "Sonar Reasoning",
    description:
      "A reasoning-focused model that outputs Chain of Thought (CoT) in responses, providing detailed explanations with search grounding.",
    pricing: {
      input: "0.000001",
      output: "0.000005",
    },
    specification: {
      specificationVersion: "v2",
      provider: "perplexity",
      modelId: "perplexity/sonar-reasoning",
    },
    modelType: "language",
  },
  {
    id: "perplexity/sonar-reasoning-pro",
    name: "Sonar Reasoning Pro",
    description:
      "A premium reasoning-focused model that outputs Chain of Thought (CoT) in responses, providing comprehensive explanations with enhanced search capabilities and multiple search queries per request.",
    pricing: {
      input: "0.000002",
      output: "0.000008",
    },
    specification: {
      specificationVersion: "v2",
      provider: "perplexity",
      modelId: "perplexity/sonar-reasoning-pro",
    },
    modelType: "language",
  },
  {
    id: "vercel/v0-1.0-md",
    name: "v0-1.0-md",
    description:
      "Access the model behind v0 to generate, fix, and optimize modern web apps with framework-specific reasoning and up-to-date knowledge.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vercel",
      modelId: "vercel/v0-1.0-md",
    },
    modelType: "language",
  },
  {
    id: "vercel/v0-1.5-md",
    name: "v0-1.5-md",
    description:
      "Access the model behind v0 to generate, fix, and optimize modern web apps with framework-specific reasoning and up-to-date knowledge.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vercel",
      modelId: "vercel/v0-1.5-md",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-2",
    name: "Grok 2",
    description:
      "Grok 2 is a frontier language model with state-of-the-art reasoning capabilities. It features advanced capabilities in chat, coding, and reasoning, outperforming both Claude 3.5 Sonnet and GPT-4-Turbo on the LMSYS leaderboard.",
    pricing: {
      input: "0.000002",
      output: "0.00001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-2",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-2-vision",
    name: "Grok 2 Vision",
    description:
      "Grok 2 vision model excels in vision-based tasks, delivering state-of-the-art performance in visual math reasoning (MathVista) and document-based question answering (DocVQA). It can process a wide variety of visual information including documents, diagrams, charts, screenshots, and photographs.",
    pricing: {
      input: "0.000002",
      output: "0.00001",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-2-vision",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-3",
    name: "Grok 3 Beta",
    description:
      "xAI's flagship model that excels at enterprise use cases like data extraction, coding, and text summarization. Possesses deep domain knowledge in finance, healthcare, law, and science.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-3",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-3-fast",
    name: "Grok 3 Fast Beta",
    description:
      "xAI's flagship model that excels at enterprise use cases like data extraction, coding, and text summarization. Possesses deep domain knowledge in finance, healthcare, law, and science. The fast model variant is served on faster infrastructure, offering response times that are significantly faster than the standard. The increased speed comes at a higher cost per output token.",
    pricing: {
      input: "0.000005",
      output: "0.000025",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-3-fast",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-3-mini",
    name: "Grok 3 Mini Beta",
    description:
      "xAI's lightweight model that thinks before responding. Great for simple or logic-based tasks that do not require deep domain knowledge. The raw thinking traces are accessible.",
    pricing: {
      input: "0.0000003",
      output: "0.0000005",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-3-mini",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-3-mini-fast",
    name: "Grok 3 Mini Fast Beta",
    description:
      "xAI's lightweight model that thinks before responding. Great for simple or logic-based tasks that do not require deep domain knowledge. The raw thinking traces are accessible. The fast model variant is served on faster infrastructure, offering response times that are significantly faster than the standard. The increased speed comes at a higher cost per output token.",
    pricing: {
      input: "0.0000006",
      output: "0.000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-3-mini-fast",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-4",
    name: "Grok 4",
    description:
      "xAI's latest and greatest flagship model, offering unparalleled performance in natural language, math and reasoning - the perfect jack of all trades.",
    pricing: {
      input: "0.000003",
      output: "0.000015",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-4",
    },
    modelType: "language",
  },
  {
    id: "zai/glm-4.5",
    name: "GLM-4.5",
    description:
      "GLM-4.5 Series Models are foundation models specifically engineered for intelligent agents. The flagship GLM-4.5 integrates 355 billion total parameters (32 billion active), unifying reasoning, coding, and agent capabilities to address complex application demands. As a hybrid reasoning system, it offers dual operational modes.",
    pricing: {
      input: "0.0000006",
      output: "0.0000022",
    },
    specification: {
      specificationVersion: "v2",
      provider: "novita",
      modelId: "zai/glm-4.5",
    },
    modelType: "language",
  },
  {
    id: "zai/glm-4.5-air",
    name: "GLM 4.5 Air",
    description:
      "GLM-4.5 and GLM-4.5-Air are our latest flagship models, purpose-built as foundational models for agent-oriented applications. Both leverage a Mixture-of-Experts (MoE) architecture. GLM-4.5 has a total parameter count of 355B with 32B active parameters per forward pass, while GLM-4.5-Air adopts a more streamlined design with 106B total parameters and 12B active parameters.",
    pricing: {
      input: "0.0000002",
      output: "0.0000011",
    },
    specification: {
      specificationVersion: "v2",
      provider: "zai",
      modelId: "zai/glm-4.5-air",
    },
    modelType: "language",
  },
  {
    id: "zai/glm-4.5v",
    name: "GLM 4.5V",
    description:
      "Built on the GLM-4.5-Air base model, GLM-4.5V inherits proven techniques from GLM-4.1V-Thinking while achieving effective scaling through a powerful 106B-parameter MoE architecture.",
    pricing: {
      input: "0.0000006",
      output: "0.0000018",
    },
    specification: {
      specificationVersion: "v2",
      provider: "novita",
      modelId: "zai/glm-4.5v",
    },
    modelType: "language",
  },
];

export function sortModelsByProvider<
  T extends { specification: { provider: string } },
>(models: T[]): T[] {
  return [...models].sort((a, b) => {
    const providerA = a.specification.provider.toLowerCase();
    const providerB = b.specification.provider.toLowerCase();
    return providerA.localeCompare(providerB);
  });
}

export const AI_MODELS = sortModelsByProvider(AI_GATEWAY_MODELS);
