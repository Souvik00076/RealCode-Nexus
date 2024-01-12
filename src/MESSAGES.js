const codeSnippetCommon = 'Real Code nexus .. Tech Stack React,Tailwind,SocketIO,Node,Express';
const MESSAGES = {
  JAVASCRIPT: `
    // ${codeSnippetCommon}
    console.log('Hello, World!');
  `,
  SWIFT: `
    // ${codeSnippetCommon}
    print("Hello, World!")
  `,
  RUBY: `
    # ${codeSnippetCommon}
    puts 'Hello, World!'
  `,
  XML: `
    <!-- ${codeSnippetCommon} -->
    <myString>Hello, World!</myString>
  `,
  SQL: `
    -- ${codeSnippetCommon}
    DECLARE @myString NVARCHAR(MAX) = 'Hello, World!';
    SELECT @myString;
  `,
  PYTHON: `
    # ${codeSnippetCommon}
    print("Hello, World!")
  `,
  PHP: `
    <?php
    // ${codeSnippetCommon}
    $myString = 'Hello, World!';
    echo $myString;
    ?>
  `,
};
module.exports=MESSAGES