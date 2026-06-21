# Component Documentation

These components were added after `07a3a37` / tag `0.1.4` to cover reusable game UI primitives. They are exported from `@javleds/vue-game-engine` and depend on the package structural CSS.

This documentation, the screenshots, and the screenshot tooling are kept in git for maintainers. They are intentionally excluded from the npm package.

Call `installTurnEngineComponentStyles()` once during app boot, then layer your game theme on top.

```ts
import { installTurnEngineComponentStyles } from '@javleds/vue-game-engine'

installTurnEngineComponentStyles()
```

## Components

- [EngineActionDialog](EngineActionDialog.md)
- [EngineCardShell](EngineCardShell.md)
- [EngineCardStack](EngineCardStack.md)
- [EngineChatForm](EngineChatForm.md)
- [EngineChatMessages](EngineChatMessages.md)
- [EngineDeckCard](EngineDeckCard.md)
- [EngineFloatingChat](EngineFloatingChat.md)
- [EngineGalleryOverlay](EngineGalleryOverlay.md)
- [EngineHelpButton](EngineHelpButton.md)
- [EngineHelpModal](EngineHelpModal.md)
- [EngineLobbyChat](EngineLobbyChat.md)
- [EngineLobbyPlayerList](EngineLobbyPlayerList.md)
- [EnginePlayerStatusPanel](EnginePlayerStatusPanel.md)
- [EngineRoomSummary](EngineRoomSummary.md)
- [EngineTabs](EngineTabs.md)
- [EngineTurnOrder](EngineTurnOrder.md)

## Documentacion de Componentes

Estos componentes se agregaron despues de `07a3a37` / tag `0.1.4` para cubrir primitivas reutilizables de UI para juegos. Se exportan desde `@javleds/vue-game-engine` y dependen del CSS estructural del paquete.

Esta documentacion, las capturas y el tooling de screenshots se mantienen en git para mantenimiento. Se excluyen intencionalmente del paquete npm.

Llama `installTurnEngineComponentStyles()` una vez durante el arranque de la app y agrega encima el tema visual de tu juego.
