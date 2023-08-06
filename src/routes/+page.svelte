<script>
  import '../app.postcss';
  import { Card, Heading, P } from 'flowbite-svelte';
  import { Icon } from 'flowbite-svelte-icons';
</script>

<div
  class="flex h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-green-500 to-90%"
>
  <div class="m-auto">
    <Card
      class="border-transparent bg-transparent shadow-none sm:shadow-xl sm:bg-opacity-60 sm:bg-gray-700 "
    >
      <Heading class="mb-4">Naphat Amundsen</Heading>
      <P class="text-gray-100 mb-8"
        >Technologically curious programmer who enjoys doing things he doesn't know how to do.</P
      >
      <span class="flex">
        <a href="https://github.com/Napam" target="_blank">
          <Icon class="text-gray-100" name="github-solid" tabindex="-1" />
        </a>
        <span class="w-4" />
        <a href="https://www.linkedin.com/in/naphat-amundsen" target="_blank">
          <Icon class="text-gray-100" name="linkedin-solid" tabindex="-1" />
        </a>
        <span class="w-4" />
        <a href="mailto: naphat@live.no" style="transform: translateY(2px)">
          <Icon class="text-gray-100" name="envelope-solid" tabindex="-1" />
        </a>
      </span>
    </Card>
  </div>
</div>
